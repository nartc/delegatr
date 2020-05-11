import { User, UserService } from '@delegatr/api/user';
import { UserJob, userQueueName } from '@delegatr/background/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor(userQueueName)
export class UserJobConsumer {
  constructor(private readonly userService: UserService) {}

  @Process(UserJob.AddUser)
  async addUser(job: Job<User>) {
    return await this.userService.create(job.data);
  }
}
