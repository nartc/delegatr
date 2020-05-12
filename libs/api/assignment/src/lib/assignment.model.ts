import { BaseModel, useMongoosePlugin } from '@delegatr/api/common';
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { Status} from '@delegatr/api/common';


@useMongoosePlugin()
export class Assignment extends BaseModel {
  @prop({
    required: true
  })
  @AutoMap()
  taskId: string;
  @prop({
    required: true
  })
  @AutoMap()
  userId: string;
  @prop({
    required: true,
    enum: Status
  })
  status: Status;
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
