import { BaseModel, useMongoosePlugin } from '@delegatr/api/common';
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';

@useMongoosePlugin()
export class TimeFrame extends BaseModel {
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
    required: true
   })
  @AutoMap()
  startTime: Date;
  @prop({
    required: true
  })
  @AutoMap()
  endTime: Date;
}
