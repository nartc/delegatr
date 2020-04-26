import { User } from '@delegatr/api-domain-model';
import { userQueueName } from '@delegatr/background-user-queue';
import { UserJob } from '@delegatr/shared-config';
import { InjectQueue } from '@nestjs/bull';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Queue } from 'bull';

@Controller()
export class UserBackgroundController {
  constructor(@InjectQueue(userQueueName) private readonly userQueue: Queue) {}

  @MessagePattern(UserJob.AddUser)
  addUserBackgroundReceiver(data: User) {
    return this.userQueue.add(UserJob.AddUser, data);
  }
}
