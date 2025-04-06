import { Injectable } from '@nestjs/common'

import { MessageTag, NotificationType } from './engine/engine.interface'
import { EngineService } from './engine/engine.service'

@Injectable()
class NotificationService {
  constructor(private readonly engineService: EngineService) {}

  async notifyNewBooking(data: any) {
    await this.engineService.sendMessage({
      messageTag: MessageTag.NEW_APPOINTMENT,
      data: {
        patientId: data['patientId'] as string,
        appointmentId: data['appointmentId'] as string,
        appointmentDate: data['appointmentDate'] as string,
        appointmentTime: data['appointmentTime'] as string,
        appointmentType: data['appointmentType'] as string,
      },
      types: [NotificationType.SLACK],
    })
  }
}

export { NotificationService }
