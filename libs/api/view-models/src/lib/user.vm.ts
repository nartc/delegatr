import { BaseVm } from '@delegatr/api/common';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

export class UserVm extends BaseVm {
  @ApiProperty()
  @AutoMap()
  email: string;
  @ApiProperty()
  @AutoMap()
  firstName: string;
  @ApiProperty()
  @AutoMap()
  lastName: string;
  @ApiProperty()
  @AutoMap()
  roleId: string;
  @ApiProperty()
  @AutoMap()
  roleName: string;
}
