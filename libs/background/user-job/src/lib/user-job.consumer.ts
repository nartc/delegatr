import { User, UserService } from '@delegatr/api/user';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { UserJob, userQueueName } from './user-job.constant';

@Processor(userQueueName)
export class UserJobConsumer {
  constructor(private readonly userService: UserService) {}

  @Process(UserJob.AddUser)
  async addUser(job: Job<User>) {
    return await this.userService.create(job.data);
  }
}
