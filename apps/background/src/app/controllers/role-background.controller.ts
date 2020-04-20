import { roleQueueName } from '@delegatr/background-role-queue';
import { RoleJob } from '@delegatr/shared-config';
import { InjectQueue } from '@nestjs/bull';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Queue } from 'bull';

@Controller()
export class RoleBackgroundController {
  constructor(@InjectQueue(roleQueueName) private readonly roleQueue: Queue) {}

  @MessagePattern(RoleJob.PopulateSystemRoles)
  async populateSystemRolesBackgroundReceiver() {
    await this.roleQueue.add(RoleJob.PopulateSystemRoles);
    return true;
  }
}
