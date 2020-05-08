import { PermissionGroups, Privilege } from '@delegatr/api/permission';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PermissionVm } from '../permission.vm';

export class CreateRoleParamsVm {
  @ApiPropertyOptional({ description: 'Id of Role that this Role can extend' })
  parentId?: string;
  @ApiProperty({
    required: true,
    maxLength: 255,
    minLength: 6,
    example: 'Standard User',
    description: 'Name of Role',
  })
  name: string;
  @ApiProperty({
    required: true,
    maxLength: 255,
    minLength: 6,
    example: 'This is a standard user',
    description: 'Description of Role',
  })
  note: string;
  @ApiProperty({
    type: () => PermissionVm,
    isArray: true,
    description: 'Permissions dictionary for this role',
    example: [
      {
        name: PermissionGroups.User,
        score: Privilege.Read,
      },
    ],
  })
  permission: PermissionVm[];
}
