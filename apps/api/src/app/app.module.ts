import { ApiAuthModule } from '@delegatr/api/auth';
import {
  ApiConfigModule,
  DbConfig,
  dbConfiguration,
} from '@delegatr/api/config';
import { ApiRoleModule } from '@delegatr/api/role';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

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
        useUnifiedTopology: true,
      }),
    }),
    ApiConfigModule,
    ApiAuthModule,
    ApiRoleModule,
  ],
})
export class AppModule {}
