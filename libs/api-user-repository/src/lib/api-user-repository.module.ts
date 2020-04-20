import { User } from '@delegatr/api-domain-model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiUserRepository } from './api-user-repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.modelName, schema: User.schema }]),
  ],
  providers: [ApiUserRepository],
  exports: [ApiUserRepository, MongooseModule, ApiUserRepositoryModule],
})
export class ApiUserRepositoryModule {}
