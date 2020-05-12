import { Injectable } from '@nestjs/common';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { BaseService } from '../../../common/src/lib/base.service';
import { Assignment } from './assignment.model';
import { AssignmentRepository } from './assignment.repository';

@Injectable()
export class AssignmentService extends BaseService<Assignment> {
  constructor(
    private readonly assignmentRepository: AssignmentRepository,
    @InjectMapper() private readonly mapper: AutoMapper
  ) {
    super(assignmentRepository);
  }

  async findAssignment(assignmentId): Promise<Assignment> {
    return await this.assignmentRepository.findAssignment(assignmentId);
  }
}
