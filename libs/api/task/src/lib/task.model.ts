import { BaseModel, useMongoosePlugin } from '@delegatr/api/common';
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { TaskPriority } from './task-priority.enum'
import { Status} from '@delegatr/api/common';

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
    text: true
  })
  @AutoMap()
  desc: string;
  @prop({
    required: true,
    minlength: 1
  })
  @AutoMap()
  timeFrameId: string;
  @prop({
    requried: true,
    enum: TaskPriority
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
    enum: Status
  })
  @AutoMap()
  status: Status


}
