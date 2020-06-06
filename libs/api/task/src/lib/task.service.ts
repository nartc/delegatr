import { BaseService } from '@delegatr/api/common';
import { Injectable } from '@nestjs/common';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { Task } from './task.model';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(
    private readonly taskRepository: TaskRepository,
    @InjectMapper() private readonly mapper: AutoMapper
  ) {
    super(taskRepository);
  }

  async findTaskById(taskId: string): Promise<Task> {
    return await this.taskRepository.findTask(taskId);
  }
}
