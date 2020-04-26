import { Task } from '@delegatr/api-domain-model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiTaskRepository } from './api-task-repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.modelName, schema: Task.schema }]),
  ],
  providers: [ApiTaskRepository],
  exports: [MongooseModule, ApiTaskRepository, ApiTaskRepositoryModule],
})
export class ApiTaskRepositoryModule {}
