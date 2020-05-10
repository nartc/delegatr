import { BaseVm } from '@delegatr/api/common';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

export class UserInformationVm extends BaseVm {
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
  fullName: string;
  @ApiProperty({ type: Object, additionalProperties: { type: 'integer' } })
  @AutoMap()
  permissions: { [key: string]: number };
}
