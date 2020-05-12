import { EmailService, EmailTemplate } from '@delegatr/api/email';
import {
  EmailJob,
  emailQueueName,
  VerifyRegistrationEmailData,
} from '@delegatr/background/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor(emailQueueName)
export class EmailJobConsumer {
  constructor(private readonly emailService: EmailService) {}

  @Process(EmailJob.VerifyRegistration)
  async sendVerifyRegistrationEmail(job: Job<VerifyRegistrationEmailData>) {
    const { email, ...emailData } = job.data;
    return await this.emailService.sendByTemplate(
      EmailTemplate.VerifyRegistration,
      {
        from: '',
        to: email,
        templateId: EmailTemplate.VerifyRegistration,
        dynamicTemplateData: emailData,
      }
    );
  }
}
