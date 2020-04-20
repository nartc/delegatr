import {
  BaseModel,
  Permission,
  useMongoosePlugins,
} from '@delegatr/api-common';
import { prop } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';

@useMongoosePlugins()
export class Role extends BaseModel {
  @prop({ default: false })
  @AutoMap()
  isGlobal: boolean;
  @prop({ default: '', required: false })
  @AutoMap()
  parentId?: string;
  @prop({
    required: true,
    unique: true,
    index: true,
    text: true,
    maxlength: 255,
    minlength: 6,
  })
  @AutoMap()
  roleName: string;
  @prop({ required: true, maxlength: 255, minlength: 6 })
  @AutoMap()
  note: string;
  @prop({ required: true, default: {} })
  @AutoMap()
  permissions: Permission;
}
