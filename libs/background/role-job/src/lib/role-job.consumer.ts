import { RoleService } from '@delegatr/api/role';
import { Processor } from '@nestjs/bull';
import { roleQueueName } from './role-job.constant';

@Processor(roleQueueName)
export class RoleJobConsumer {
  constructor(private readonly roleService: RoleService) {}
}
