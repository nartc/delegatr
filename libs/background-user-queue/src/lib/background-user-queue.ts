import { User } from '@delegatr/api-domain-model';
import { ApiUserRepository } from '@delegatr/api-user-repository';
import { UserJob } from '@delegatr/shared-config';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { userQueueName } from './background-user-queue.constant';

@Processor(userQueueName)
export class BackgroundUserQueueConsumer {
  constructor(private readonly apiUserRepository: ApiUserRepository) {}

  @Process(UserJob.AddUser)
  async addUser(job: Job<User>) {
    const { data } = job;
    return await this.apiUserRepository.create(data);
  }
}
