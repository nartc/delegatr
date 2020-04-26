import { BaseRepository } from '@delegatr/api-common';
import { Task } from '@delegatr/api-domain-model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class ApiTaskRepository extends BaseRepository<Task> {
  constructor(
    @InjectModel(Task.modelName)
    private readonly taskModel: ReturnModelType<typeof Task>
  ) {
    super(taskModel);
  }
}
