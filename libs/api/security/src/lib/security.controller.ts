import { ApiErrors } from '@delegatr/api/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { SecurityService } from './security.service';

@Controller('security')
@ApiTags('Security')
@ApiErrors()
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @UseGuards(AuthGuard())
  async get() {}
}
