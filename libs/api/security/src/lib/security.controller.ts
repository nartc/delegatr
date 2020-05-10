import { ApiErrors } from '@delegatr/api/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SecurityService } from './security.service';

@Controller('security')
@ApiTags('Security')
@ApiErrors()
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}
}
