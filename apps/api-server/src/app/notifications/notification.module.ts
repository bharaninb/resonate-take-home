import { Module } from '@nestjs/common'


import { EmailService } from './engine/email.service'
import { EngineService } from './engine/engine.service'
import { PushService } from './engine/push.service'
import { SlackService } from './engine/slack.service'
import { NotificationController } from './notification.controller'
import { NotificationService } from './notification.service'

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [EngineService, SlackService, NotificationService, PushService, EmailService],
  exports: [],
})
export class NotificationModule {}
