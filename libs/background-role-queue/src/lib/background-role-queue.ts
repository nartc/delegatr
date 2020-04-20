import { ApiRoleRepository } from '@delegatr/api-role-repository';
import { RoleJob } from '@delegatr/shared-config';
import { Process, Processor } from '@nestjs/bull';
import { BadRequestException } from '@nestjs/common';
import { Job } from 'bull';
import { roleQueueName } from './background-role-queue.constant';

@Processor(roleQueueName)
export class BackgroundRoleQueueConsumer {
  constructor(private readonly apiRoleRepository: ApiRoleRepository) {}

  @Process(RoleJob.PopulateSystemRoles)
  async populateSystemRoles(job: Job) {
    try {
      return await this.apiRoleRepository.createSystemRoles();
    } catch (e) {
      if (e instanceof BadRequestException) {
        return job.moveToCompleted('System Roles have already been populated.');
      }

      throw new Error(
        typeof e.message === 'object'
          ? `${e.message.error}: ${e.message.message}`
          : e.message
      );
    }
  }
}
