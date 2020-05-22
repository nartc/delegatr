import { ApiErrors, ApiOperationId } from '@delegatr/api/common';
import {
  LoginParamsVm,
  RegisterParamsVm,
  TokenResultVm,
  UserVm,
  VerifyRegistrationParamsVm,
} from '@delegatr/api/view-models';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { SecurityService } from './security.service';

@Controller('security')
@ApiTags('Security')
@ApiErrors()
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('register')
  @ApiCreatedResponse()
  @ApiOperationId()
  async register(@Body() registerParams: RegisterParamsVm): Promise<void> {
    return await this.securityService.register(registerParams);
  }

  @Post('login')
  @ApiCreatedResponse({ type: TokenResultVm })
  @ApiOperationId()
  async login(
    @Body() loginParams: LoginParamsVm,
    @Res() res: Response
  ): Promise<void> {
    const [tokenResult, refreshToken] = await this.securityService.login(
      loginParams
    );
    res
      .cookie('refresh_token', refreshToken, { httpOnly: true, secure: true })
      .status(HttpStatus.CREATED)
      .json(tokenResult);
  }

  @Put('verify')
  @ApiOkResponse({ type: UserVm })
  @ApiOperationId()
  async verify(
    @Body() verifyParams: VerifyRegistrationParamsVm
  ): Promise<UserVm> {
    return await this.securityService.verify(verifyParams.token);
  }

  @Get('resend-verification')
  @ApiQuery({
    name: 'email',
    type: 'string',
    required: true,
  })
  @ApiOkResponse()
  @ApiOperationId()
  async resendVerificationEmail(@Query('email') email: string): Promise<void> {
    return await this.securityService.resendVerificationEmail(email);
  }
}
