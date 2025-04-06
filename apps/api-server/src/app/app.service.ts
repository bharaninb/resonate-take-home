import { Injectable } from '@nestjs/common'
import { OpenaiService } from './openai'
import OpenAI from 'openai'

import { map as mapRad } from 'radash'
import { ConversationService, PatientService } from './mock-data'
import { AppointmentService } from './mock-data/appointment.service'
import { convTools } from './conv-tool'

@Injectable()
export class AppService {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly patientService: PatientService,
    private readonly appointmentService: AppointmentService,
    private readonly conversationService: ConversationService
  ) {}

  getData(): { message: string } {
    return { message: 'Hello API' }
  }

  async callFunction(
    tool_call: OpenAI.Chat.Completions.ChatCompletionMessageToolCall
  ): Promise<any> {
    const args = JSON.parse(tool_call.function.arguments)

    console.log('Function call:', tool_call.function.name, args)
    switch (tool_call.function.name) {
      case 'create_patient':
        return this.patientService.createPatient(args) || 'Patient creation failed'

      case 'get_patient_info':
        return this.patientService.getPatientByMobile(args['mobile']) || 'No patient found'

      case 'get_available_time_slots':
        return this.appointmentService.getAvailableSlots(args['date'])

      case 'book_appointment': {
        const appointment = await this.appointmentService.bookAppointment(
          args['appointmentId'],
          args['patientId'],
          args['appointmentType'],
          args['emergencyReason']
        )

        return {
          appointment,
          messageToUser:
            'Inform user with their first name about appointment booking and share the appointment details with appointment id. If its an emergency appointment, inform the user that we have notified the dental staff about the nature of the appointment.',
        }
      }

      case 'reschedule_appointment':
        return this.appointmentService.rescheduleAppointment(
          args['code'],
          args['date'],
          args['time'],
          args['appointmentType'],
          args['emergencyReason']
        )
      case 'cancel_appointment':
        return this.appointmentService.cancelAppointment(args['code'], args['cancelReason'])
      case 'get_appointment_info':
        return this.appointmentService.getAppointmentsByPatientId(args['patientId'])

      default:
        throw new Error('No function found')
    }
  }

  async getChat(chatId: string, message: string): Promise<{ chatId: string; message: string }> {
    // eslint-disable-next-line prefer-const
    let { convId, chatHistory } = this.conversationService.addMessageToConversation(chatId, message)

    while (true) {
      const response = await this.openaiService.chatCompletion(chatHistory, convTools)

      console.log(response.choices)

      const responseMsg = response.choices[0].message

      chatHistory = this.conversationService.addResponseToConversation(convId, responseMsg)

      console.log(responseMsg)

      // If there is no function call, we're done and can exit this loop
      if (!responseMsg.tool_calls) {
        return {
          chatId: convId,
          message: responseMsg.content || '',
        }
      }

      await mapRad(responseMsg.tool_calls, async (tool_call) => {
        console.log('Tool call:', tool_call)
        const result = await this.callFunction(tool_call)

        const newMessage = {
          role: 'tool' as const,
          tool_call_id: tool_call.id,
          content: JSON.stringify(result),
        }
        chatHistory = this.conversationService.addResponseToConversation(convId, newMessage)
      })
    }
  }
}
