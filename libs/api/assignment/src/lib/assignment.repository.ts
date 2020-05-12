import { BaseRepository } from '@delegatr/api/common';
import { ModelType } from '@delegatr/api/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Assignment } from './assignment.model';

@Injectable()
export class AssignmentRepository extends BaseRepository<Assignment> {
  constructor(
    @InjectModel(Assignment.modelName) private readonly assignmentModel: ModelType<Assignment>
  ) {
    super(assignmentModel);
  }

  async findAssignment(assignmentId: string) {
    try {
      return await this.findOne().where('id').equals(assignmentId).exec();
    } catch (e) {
      AssignmentRepository.throwMongoError(e);
    }
  }

}
