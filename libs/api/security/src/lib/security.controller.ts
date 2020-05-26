import {
  ApiErrors,
  ApiOperationId,
  Cookie,
  CurrentUser,
} from '@delegatr/api/common';
import {
  AuthUser,
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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCookieAuth,
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
  @ApiCreatedResponse({
    type: TokenResultVm,
    headers: {
      'Set-Cookie': {
        description: 'Refresh Token',
        schema: { type: 'string' },
      },
    },
  })
  @ApiOperationId()
  async login(
    @Body() loginParams: LoginParamsVm,
    @Res() res: Response
  ): Promise<void> {
    const [tokenResult, refreshToken] = await this.securityService.login(
      loginParams
    );
    res
      .cookie('rtok', refreshToken, { httpOnly: true })
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

  @Put('logout')
  @UseGuards(AuthGuard())
  @ApiOkResponse()
  @ApiOperationId()
  async logout(@CurrentUser() user: AuthUser): Promise<void> {
    return await this.securityService.revokeRefreshToken(user.id);
  }

  @Post('refresh-token')
  @ApiCreatedResponse({
    type: TokenResultVm,
    headers: {
      'Set-Cookie': {
        description: 'Refresh Token',
        schema: { type: 'string' },
      },
    },
  })
  @ApiOperationId()
  @ApiCookieAuth()
  async refreshToken(
    @Cookie('rtok') refreshToken: string,
    @Res() res: Response
  ): Promise<void> {
    const [tokenResult, newToken] = await this.securityService.refreshToken(
      refreshToken
    );
    res
      .cookie('rtok', newToken, { httpOnly: true })
      .status(HttpStatus.CREATED)
      .json(tokenResult);
  }
}
