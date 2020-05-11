import { EmailService } from '@delegatr/api/email';
import { Processor } from '@nestjs/bull';
import { emailQueueName } from './email-job.constant';

@Processor(emailQueueName)
export class EmailJobConsumer {
  constructor(private readonly emailService: EmailService) {}
}
