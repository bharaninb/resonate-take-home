import { Injectable } from '@nestjs/common'

import { EngineFactory } from './engine.factory'
import { NotificationTemplateOption } from './engine.interface'

@Injectable()
class PushService implements EngineFactory {

  async sendMessage(template: NotificationTemplateOption): Promise<void> {
    //implement push notification logic here
  }
}

export { PushService }
