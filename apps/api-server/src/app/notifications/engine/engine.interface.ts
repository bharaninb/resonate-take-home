enum MessageTag {
  NEW_APPOINTMENT = 'NEW_APPOINTMENT',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
}

interface TemplateVariable {
  [MessageTag.NEW_APPOINTMENT]: {
    patientId: string
    appointmentId: string
    appointmentType: string
    appointmentDate: string
    appointmentTime: string
  }
  [MessageTag.EMAIL_VERIFICATION]: {
    verificationLink: string
    to: {
      email: string
    }
  }
}

enum NotificationType {
  SLACK = 'SLACK',
  PUSH = 'PUSH',
  EMAIL = 'EMAIL',
}

interface SendNotificationParams {
  messageTag: MessageTag
  data: TemplateVariable[MessageTag]
  types: NotificationType[]
  user?: any
}

type NotificationTemplateOption = {
  subject: string
  message?: string
  htmlContent?: string
  textContent?: string
  channel?: string
  blocks?: {
    text?: string
    fields?: string[]
  }[]
  data?: TemplateVariable[MessageTag]
  from?: {
    name: string
    email: string
  }
  replyTo?: string
  tags?: string[]
}

export { MessageTag, NotificationType }
export type { TemplateVariable, SendNotificationParams, NotificationTemplateOption }
