import { BaseModel, useMongoosePlugins } from '@delegatr/api-common';
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { Role } from './role.model';

@useMongoosePlugins()
export class User extends BaseModel {
  @prop({ default: false })
  isSuper: boolean;
  @prop({
    required: true,
    unique: true,
    trim: true,
    minlength: 8,
    maxlength: 100,
    text: true
  })
  email: string;
  @prop({ required: true, minlength: 1, maxlength: 100, index: true })
  firstName: string;
  @prop({ required: true, minlength: 1, maxlength: 100, index: true })
  lastName: string;
  @prop({ required: true, minlength: 6 })
  password: string;
  @prop({ ref: Role, autopopulate: true, default: null })
  @AutoMap(() => Role)
  role: Ref<Role>;
}
