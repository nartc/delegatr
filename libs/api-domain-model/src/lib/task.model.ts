import { BaseModel, useMongoosePlugins } from '@delegatr/api-common';
import { arrayProp, prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { Assignment } from './assignment.model';
import { User } from './user.model';

export enum TaskStatus {
  Open = 'open',
  InProgress = 'inProgress',
  Done = 'done',
  Removed = 'removed',
  Obsolete = 'obsolete',
}

@useMongoosePlugins()
export class Task extends BaseModel {
  @prop({ index: true })
  @AutoMap()
  slug: string;
  @prop({ required: true, minlength: 6, maxlength: 250, text: true })
  @AutoMap()
  name: string;
  @prop({ required: true, minlength: 6 })
  @AutoMap()
  description: string;
  @prop({ ref: Task, autopopulate: true })
  @AutoMap(() => Task)
  parent: Ref<Task>;
  @arrayProp({
    ref: 'Assignment',
    autopopulate: true,
    default: [],
    required: false,
  })
  @AutoMap(() => Assignment)
  assignments: Ref<Assignment>[];
  @prop({ enum: TaskStatus, default: TaskStatus.Open })
  @AutoMap()
  status: TaskStatus;
  @prop({ ref: User, autopopulate: true })
  @AutoMap(() => User)
  createdBy: Ref<User>;
  @prop({ ref: User, autopopulate: true })
  @AutoMap(() => User)
  updatedBy: Ref<User>;
}
