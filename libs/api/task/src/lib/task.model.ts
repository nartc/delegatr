import { BaseModel, Status, useMongoosePlugin } from '@delegatr/api/common';
import { prop } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { TaskPriority } from './task-priority.enum';

@useMongoosePlugin()
export class Task extends BaseModel {
  @prop({
    required: true,
    minlength: 1,
    text: true,
  })
  @AutoMap()
  name: string;
  @prop({
    required: true,
    minlength: 1,
    text: true,
  })
  @AutoMap()
  desc: string;
  @prop({
    required: true,
    minlength: 1,
  })
  @AutoMap()
  timeFrameId: string;
  @prop({
    required: true,
    enum: TaskPriority,
    type: Number,
  })
  @AutoMap()
  priority: TaskPriority;
  @prop({
    array: true,
  })
  @AutoMap()
  assignmentsId: string;
  @prop({
    required: true,
    enum: Status,
    type: Number
  })
  @AutoMap()
  status: Status;
}
