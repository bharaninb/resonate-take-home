import { Injectable } from '@nestjs/common'

import { NotificationTemplateOption } from './engine.interface'
import { EngineFactory } from './engine.factory'

@Injectable()
export class EmailService implements EngineFactory {
  constructor() {
    //init email client here
  }

  async sendMessage(options: NotificationTemplateOption): Promise<void> {
    await this.sendFromResend(options)
  }

  private async sendFromResend(options: NotificationTemplateOption) {
    //implement resend notification logic here
  }
}
