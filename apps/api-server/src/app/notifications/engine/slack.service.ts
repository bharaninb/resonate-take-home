import { Injectable } from '@nestjs/common'

import { EngineFactory } from './engine.factory'
import { NotificationTemplateOption } from './engine.interface'

@Injectable()
class SlackService implements EngineFactory {
  constructor() {
    this.init()
  }

  private init() {
    //init slack client here
  }

  async sendMessage(template: NotificationTemplateOption): Promise<void> {
    // implement slack notification logic here
  }
}

export { SlackService }
