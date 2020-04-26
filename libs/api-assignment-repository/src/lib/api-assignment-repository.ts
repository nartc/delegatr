import { BaseRepository } from '@delegatr/api-common';
import { Assignment } from '@delegatr/api-domain-model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class ApiAssignmentRepository extends BaseRepository<Assignment> {
  constructor(
    @InjectModel(Assignment.modelName)
    private readonly assignmentModel: ReturnModelType<typeof Assignment>
  ) {
    super(assignmentModel);
  }
}
