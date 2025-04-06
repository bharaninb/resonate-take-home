import { Injectable } from '@nestjs/common'
import {
  cloneDeep,
  isArray,
  isObject,
  isString,
  mapValues,
  template,
  templateSettings,
} from 'lodash'

import { EmailService } from './email.service'
import { EngineFactory } from './engine.factory'
import {
  NotificationTemplateOption,
  NotificationType,
  SendNotificationParams,
} from './engine.interface'
import { PushService } from './push.service'
import { SlackService } from './slack.service'
import { NotificationTemplates } from './template'

@Injectable()
export class EngineService {
  private serviceMap: Record<keyof typeof NotificationType, EngineFactory>

  constructor(
    private readonly slackService: SlackService,
    private readonly pushService: PushService,
    private readonly emailService: EmailService
  ) {
    templateSettings.interpolate = /{{([\s\S]+?)}}/g

    this.serviceMap = {
      [NotificationType.SLACK]: this.slackService,
      [NotificationType.PUSH]: this.pushService,
      [NotificationType.EMAIL]: this.emailService,
    }
  }

  private executeTemplate(
    notificationTemplate: NotificationTemplateOption,
    data: SendNotificationParams['data']
  ) {
    const parseData = (str: string) => template(str)(data)

    return mapValues(notificationTemplate, (value) => {
      if (isString(value)) {
        return parseData(value)
      }

      if (isArray(value)) {
        return value.map((item) => {
          if (isString(item)) return parseData(item)
          const { text, fields } = item
          return {
            text: text ? parseData(text) : text,
            fields: fields?.map(parseData),
          }
        })
      }

      if (isObject(value)) {
        return mapValues(value, (val) => parseData(val))
      }

      return value
    }) as NotificationTemplateOption
  }

  async sendMessage({ messageTag, data, types }: SendNotificationParams): Promise<void> {
    const templateWithLanguages = cloneDeep(NotificationTemplates[messageTag])

    let notificationTemplate: NotificationTemplateOption = {
      ...templateWithLanguages,
    }
    notificationTemplate = this.executeTemplate(notificationTemplate, data)

    const promiseList = types.map((type) =>
      this.serviceMap[type].sendMessage({ ...notificationTemplate, data })
    )
    await Promise.all(promiseList)
  }
}
