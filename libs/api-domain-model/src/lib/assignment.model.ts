import { BaseModel, useMongoosePlugins } from '@delegatr/api-common';
import { arrayProp, prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { Task } from './task.model';
import { User } from './user.model';

export enum AssignmentStatus {
  NotStarted = 'notStarted',
  Started = 'started',
  Done = 'done',
}

export class AssignmentNote {
  @prop()
  createdAt: Date;
  @prop()
  updatedAt: Date;
  @prop({ ref: User, autopopulate: true, default: null })
  @AutoMap(() => User)
  addedBy: Ref<User>;
  @prop({ required: true, minlength: 6 })
  content: string;
}

@useMongoosePlugins()
export class Assignment extends BaseModel {
  @prop({ ref: User, autopopulate: true })
  @AutoMap(() => User)
  assignedTo: Ref<User>;
  @prop({ required: true, default: AssignmentStatus.NotStarted })
  @AutoMap()
  status: AssignmentStatus;
  @arrayProp({
    items: AssignmentNote,
    default: [],
    required: false,
    _id: false,
  })
  notes?: AssignmentNote[];
  @prop({ ref: 'Task', autopopulate: true })
  @AutoMap(() => Task)
  task: Ref<Task>;
}
