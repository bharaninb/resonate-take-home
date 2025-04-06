import { NotificationTemplateOption } from './engine.interface'

interface EngineFactory {
  sendMessage(template: NotificationTemplateOption): Promise<void>
}

export type { EngineFactory }
