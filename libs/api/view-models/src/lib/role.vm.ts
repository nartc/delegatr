import { BaseVm } from '@delegatr/api/common';
import { PermissionVm } from '@delegatr/api/view-models';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

export class RoleVm extends BaseVm {
  @ApiProperty()
  @AutoMap()
  isGlobal: boolean;
  @ApiPropertyOptional()
  @AutoMap()
  parentId?: string;
  @ApiProperty()
  @AutoMap()
  name: string;
  @ApiProperty()
  @AutoMap()
  slug: string;
  @ApiProperty()
  @AutoMap()
  note: string;
  @ApiProperty({ type: () => PermissionVm, isArray: true })
  @AutoMap(() => PermissionVm)
  permissions: PermissionVm[];
}
