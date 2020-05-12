import { ApiErrors } from '@delegatr/api/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('tasks')
@ApiTags(Task.modelName)
@ApiErrors()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
}
