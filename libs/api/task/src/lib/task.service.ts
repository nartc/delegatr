import { Injectable } from '@nestjs/common';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { BaseService } from '../../../common/src/lib/base.service';
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

  async findTask(taskId): Promise<Task> {
    return await this.taskRepository.findTask(taskId);
  }
}
