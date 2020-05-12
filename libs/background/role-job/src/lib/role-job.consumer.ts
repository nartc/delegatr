import { RoleService } from '@delegatr/api/role';
import { roleQueueName } from '@delegatr/background/common';
import { Processor } from '@nestjs/bull';

@Processor(roleQueueName)
export class RoleJobConsumer {
  constructor(private readonly roleService: RoleService) {}
}
