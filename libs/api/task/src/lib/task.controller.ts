import { ApiErrors, ApiOperationId } from '@delegatr/api/common';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('tasks')
@ApiTags(Task.modelName)
@ApiErrors()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  @ApiOkResponse({ type: String })
  @ApiOperationId()
  async findTaskById(@Param('id') id: string): Promise<string> {
    const result = await this.taskService.findTaskById(id);
    return result.id;
  }
}
