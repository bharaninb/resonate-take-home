//cspell:disable
import { MessageTag, NotificationTemplateOption } from './engine.interface'
import { emailVerificationHtmlTemplate } from './mail-templates/email-verification-html-template'
import { emailVerificationPlainTextTemplate } from './mail-templates/email-verification-text-template'

type NotificationTemplates = {
  [key in MessageTag]: NotificationTemplateOption
}

const NotificationTemplates: NotificationTemplates = {
  [MessageTag.NEW_APPOINTMENT]: {
    subject: 'N',
    blocks: [
      {
        fields: [`Appointment Id`, '*Id*\n{{id}}'],
      },
      { text: '*Appointment Info: *\n{{info}}' },
    ],
    channel: 'appointment',
  },
  [MessageTag.EMAIL_VERIFICATION]: {
    from: {
      name: 'environment.notification.email.fromName',
      email: 'environment.notification.email.fromEmail',
    },
    subject: 'Email verification',
    message: emailVerificationPlainTextTemplate,
    htmlContent: emailVerificationHtmlTemplate,
    textContent: emailVerificationPlainTextTemplate,
  },
}

export { NotificationTemplates }
