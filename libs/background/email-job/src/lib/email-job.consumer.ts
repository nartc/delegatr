import { EmailService } from '@delegatr/api/email';
import { emailQueueName } from '@delegatr/background/common';
import { Processor } from '@nestjs/bull';

@Processor(emailQueueName)
export class EmailJobConsumer {
  constructor(private readonly emailService: EmailService) {}
}
