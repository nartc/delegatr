import { ApiErrors } from '@delegatr/api/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from './role.model';
import { RoleService } from './role.service';

@Controller('roles')
@ApiTags(Role.modelName)
@ApiErrors()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
}
