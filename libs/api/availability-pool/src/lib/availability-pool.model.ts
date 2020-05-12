import { BaseModel, useMongoosePlugin } from '@delegatr/api/common';
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { User } from '@delegatr/api/user'

@useMongoosePlugin()
export class AvailabilityPool extends BaseModel {
  @prop({
    required: true,
    minlength: 1
  })
  @AutoMap()
  timeFrameId: string;
  @prop({
    required: true,
    array: true,
  })
  @AutoMap()
  userList: User[];
}
