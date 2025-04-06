import { Injectable } from '@nestjs/common'
import { DateTime } from 'luxon'
import OpenAI from 'openai'
import { v4 as uuidv4 } from 'uuid'

const conversationData: {
  [chatId: string]: {
    patientId?: string
    chatHistory: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
  }
} = {}

const SYSTEM_MESSAGE = `You are a friendly dental clinic assistant helping patients book appointments in a warm and human way. If unsure, gently ask for clarification. You can answer questions, provide information, and assist with various tasks. If you don't know the answer, it's okay to say you don't know. If you need more information, ask clarifying questions. If the user is rude or inappropriate, respond politely but firmly that such behavior is not acceptable.

The user can book the appointment from 8 AM to 6 PM from Monday to Saturday. Check if the time provided by the user is within the working hours then only you will proceed.

You need to remember that today's date is ${DateTime.now().toISODate()} and day is ${
  DateTime.now().day
}. 

Don't hallucinate. If you don't know the answer, say you don't know. Don't make up information. If the user asks for something outside your expertise, politely decline and suggest they consult a professional. But make sure you communicate in a friendly and helpful manner.

Please be as a human. Don't use system terms like patient, slots etc. Use human friendly terms like appointment, time, date etc.
`

@Injectable()
export class ConversationService {
  private createConversation(chatId: string, patientId?: string): string {
    if (conversationData[chatId]) return chatId

    const convId = chatId === 'NEW_CHAT_ID' ? uuidv4() : chatId

    conversationData[convId] = {
      chatHistory: [
        {
          role: 'system',
          content: SYSTEM_MESSAGE,
        },
      ],
      patientId,
    }

    return convId
  }

  addMessageToConversation(
    chatId: string,
    message: string,
    patientId?: string
  ): { chatHistory: OpenAI.Chat.Completions.ChatCompletionMessageParam[]; convId: string } {
    const convId = this.createConversation(chatId, patientId)
    conversationData[convId].chatHistory.push({
      role: 'user',
      content: message,
    })
    return { chatHistory: conversationData[convId].chatHistory, convId }
  }

  addResponseToConversation(
    chatId: string,
    response: OpenAI.Chat.Completions.ChatCompletionMessageParam
  ): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
    const convId = this.createConversation(chatId)
    conversationData[convId].chatHistory.push(response)

    return conversationData[convId].chatHistory
  }
}
