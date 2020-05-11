import { InjectSgConfig } from '@delegatr/api/config';
import { SgConfig } from '@delegatr/api/types';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { EmailTemplate } from './email-template.enum';

@Injectable()
export class EmailService {
  constructor(@InjectSgConfig() private readonly sgConfig: SgConfig) {
    sgMail.setApiKey(sgConfig.apiKey);
  }

  async send(
    templateId: EmailTemplate,
    mailData: MailDataRequired,
    isMultiple = false
  ): ReturnType<typeof sgMail.send> {
    mailData = { ...mailData, templateId };
    try {
      return await sgMail.send(mailData, isMultiple);
    } catch (e) {
      throw new InternalServerErrorException(
        mailData,
        'Error sending email' + e.message
      );
    }
  }
}
