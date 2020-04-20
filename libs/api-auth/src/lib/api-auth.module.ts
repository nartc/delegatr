import { authConfiguration } from '@delegatr/api-config';
import { ApiUserRepositoryModule } from '@delegatr/api-user-repository';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategyService } from './jwt-strategy.service';
import { PassportGlobalModule } from './passport-global.module';

@Module({
  imports: [
    PassportGlobalModule,
    JwtModule.registerAsync({
      inject: [authConfiguration.KEY],
      useFactory: (authConfig: ConfigType<typeof authConfiguration>) => ({
        secret: authConfig.jwtSecret,
        signOptions: {
          expiresIn: authConfig.jwtExpired,
        },
      }),
    }),
    ApiUserRepositoryModule,
  ],
  providers: [AuthService, JwtStrategyService],
  exports: [AuthService],
})
export class ApiAuthModule {}
