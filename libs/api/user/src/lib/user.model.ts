import { BaseModel, useMongoosePlugin } from '@delegatr/api/common';
import { Role } from '@delegatr/api/role';
import { prop, Ref } from '@typegoose/typegoose';

@useMongoosePlugin()
export class User extends BaseModel {
  @prop({
    required: true,
    unique: true,
    trim: true,
    minlength: 8,
    maxlength: 100,
    text: true,
  })
  email: string;
  @prop({ required: true, minlength: 1, maxlength: 100, index: true })
  firstName: string;
  @prop({ required: true, minlength: 1, maxlength: 100, index: true })
  lastName: string;
  @prop({ required: true, minlength: 6 })
  password: string;
  @prop({ ref: Role, autopopulate: true, default: null })
  role: Ref<Role>;
}
