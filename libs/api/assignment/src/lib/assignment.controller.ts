import { ApiErrors } from '@delegatr/api/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Assignment } from './assignment.model';
import { AssignmentService } from './assignment.service';

@Controller('assignments')
@ApiTags(Assignment.modelName)
@ApiErrors()
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}
}
