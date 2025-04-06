import { Body, Controller, Post } from '@nestjs/common'

import { NotificationService } from './notification.service'

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('notify-new-booking')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notifyReview(@Body('message') message: { data: any }) {
    return this.notificationService.notifyNewBooking(message.data)
  }
}
