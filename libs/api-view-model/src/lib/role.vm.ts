import { BaseVm, Permission } from '@delegatr/api-common';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

export class RoleVm extends BaseVm {
  @AutoMap()
  isGlobal: boolean;
  @AutoMap()
  parentId?: string;
  @AutoMap()
  roleName: string;
  @AutoMap()
  note: string;
  @ApiProperty({ default: {} })
  @AutoMap()
  permissions: Permission;
}
