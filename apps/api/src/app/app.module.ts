import { ApiAssignmentRepositoryModule } from '@delegatr/api-assignment-repository';
import { ApiAuthModule } from '@delegatr/api-auth';
import { ApiConfigModule } from '@delegatr/api-config';
import { ApiRoleRepositoryModule } from '@delegatr/api-role-repository';
import { ApiTaskRepositoryModule } from '@delegatr/api-task-repository';
import { ApiUserRepositoryModule } from '@delegatr/api-user-repository';
import { redisConfiguration, RoleJob } from '@delegatr/shared-config';
import { SharedDbModule } from '@delegatr/shared-db';
import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { AutomapperModule } from 'nestjsx-automapper';

@Module({
  imports: [
    ApiConfigModule,
    AutomapperModule.withMapper(),
    SharedDbModule,
    ApiAuthModule,
    ApiUserRepositoryModule,
    ApiRoleRepositoryModule,
    ApiTaskRepositoryModule,
    ApiAssignmentRepositoryModule,
  ],
  providers: [
    {
      provide: 'backgroundClient',
      inject: [redisConfiguration.KEY],
      useFactory: (redisConfig: ConfigType<typeof redisConfiguration>) => {
        return ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            url: `redis://${redisConfig.host}:${redisConfig.port}`,
          },
        });
      },
    },
  ],
})
export class AppModule implements OnModuleInit {
  private logger = new Logger(AppModule.name);

  constructor(
    @Inject('backgroundClient') private readonly roleClient: ClientProxy
  ) {}

  onModuleInit() {
    this.roleClient.send(RoleJob.PopulateSystemRoles, {}).subscribe(() => {
      this.logger.log('Populating system roles...');
    });
  }
}
