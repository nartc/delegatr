import { Assignment } from '@delegatr/api-domain-model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiAssignmentRepository } from './api-assignment-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Assignment.modelName, schema: Assignment.schema },
    ]),
  ],
  providers: [ApiAssignmentRepository],
  exports: [
    MongooseModule,
    ApiAssignmentRepository,
    ApiAssignmentRepositoryModule,
  ],
})
export class ApiAssignmentRepositoryModule {}
