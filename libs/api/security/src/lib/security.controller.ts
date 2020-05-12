import { ApiErrors, ApiOperationId } from '@delegatr/api/common';
import { RegisterParamsVm } from '@delegatr/api/view-models';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SecurityService } from './security.service';

@Controller('security')
@ApiTags('Security')
@ApiErrors()
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('register')
  @ApiCreatedResponse({})
  @ApiOperationId()
  async register(@Body() registerParams: RegisterParamsVm): Promise<void> {
    return await this.securityService.register(registerParams);
  }
}
