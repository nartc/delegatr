import { Permission } from '@delegatr/api-common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleParamsVm {
  @ApiProperty({ default: false, description: 'Is this role Global?' })
  isGlobal: boolean;
  @ApiPropertyOptional({
    description: 'Id of Role that this Role can extend',
  })
  parentId?: string;
  @ApiProperty({
    required: true,
    maxLength: 255,
    minLength: 6,
    example: 'Standard User',
    description: 'Name of Role',
  })
  roleName: string;
  @ApiProperty({
    required: true,
    maxLength: 255,
    minLength: 6,
    example: 'This is a standard user',
    description: 'Description of Role',
  })
  note: string;
  @ApiProperty({
    default: {},
    description: 'Permissions dictionary for this role',
    example: { user: 7, role: 1 },
  })
  permissions?: Permission;
}
