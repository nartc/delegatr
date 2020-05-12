import { BaseRepository } from '@delegatr/api/common';
import { ModelType } from '@delegatr/api/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.model';

@Injectable()
export class TaskRepository extends BaseRepository<Task> {
  constructor(
    @InjectModel(Task.modelName) private readonly taskModel: ModelType<Task>
  ) {
    super(taskModel);
  }

  async findTask(taskId: string) {
    try {
      return await this.findOne().where('id').equals(taskId).exec();
    } catch (e) {
      TaskRepository.throwMongoError(e);
    }
  }

}
