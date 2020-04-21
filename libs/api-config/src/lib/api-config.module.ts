import { dbConfiguration, redisConfiguration } from '@delegatr/shared-config';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfiguration } from './app.configuration';
import { authConfiguration } from './auth.configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfiguration,
        dbConfiguration,
        authConfiguration,
        redisConfiguration,
      ],
    }),
  ],
  exports: [ConfigModule],
})
export class ApiConfigModule {}
