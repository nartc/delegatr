import { ApiAuthModule } from '@delegatr/api/auth';
import { ApiCachingModule } from '@delegatr/api/caching';
import { ApiConfigModule, dbConfiguration } from '@delegatr/api/config';
import { ApiEmailModule } from '@delegatr/api/email';
import '@delegatr/api/mappings';
import { ApiRoleModule } from '@delegatr/api/role';
import { ApiSecurityModule } from '@delegatr/api/security';
import { DbConfig } from '@delegatr/api/types';
import { ApiUserModule } from '@delegatr/api/user';
import { BackgroundEmailJobModule } from '@delegatr/background/email-job';
import { BackgroundRoleJobModule } from '@delegatr/background/role-job';
import { BackgroundUserJobModule } from '@delegatr/background/user-job';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from 'nestjsx-automapper';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [dbConfiguration.KEY],
      useFactory: (dbConfig: DbConfig) => ({
        uri: dbConfig.uri,
        retryAttempts: 5,
        retryDelay: 1000,
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
    }),
    AutomapperModule.withMapper(),
    ApiConfigModule,
    ApiCachingModule,
    ApiEmailModule,
    ApiAuthModule,
    ApiRoleModule,
    ApiUserModule,
    ApiSecurityModule,
    BackgroundUserJobModule,
    BackgroundRoleJobModule,
    BackgroundEmailJobModule
  ]
})
export class AppModule {
}
