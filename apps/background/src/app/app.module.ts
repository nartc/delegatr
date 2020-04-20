import { BackgroundConfigModule } from '@delegatr/background-config';
import { BackgroundRoleQueueModule } from '@delegatr/background-role-queue';
import { BackgroundUserQueueModule } from '@delegatr/background-user-queue';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleBackgroundController } from './controllers/role-background.controller';
import { UserBackgroundController } from './controllers/user-background.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/delegatr-local', {
      retryAttempts: 5,
      retryDelay: 1000,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }),
    BackgroundConfigModule,
    BackgroundUserQueueModule,
    BackgroundRoleQueueModule,
  ],
  controllers: [UserBackgroundController, RoleBackgroundController],
})
export class AppModule {}
