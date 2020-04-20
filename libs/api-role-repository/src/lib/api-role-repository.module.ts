import { Role } from '@delegatr/api-domain-model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiRoleRepository } from './api-role-repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.modelName, schema: Role.schema }]),
  ],
  providers: [ApiRoleRepository],
  exports: [MongooseModule, ApiRoleRepositoryModule, ApiRoleRepository],
})
export class ApiRoleRepositoryModule {}
