import { applyDecorators } from '@nestjs/common';
import { plugin } from '@typegoose/typegoose';
import * as autoPopulate from 'mongoose-autopopulate';
import * as leanVirtuals from 'mongoose-lean-virtuals';

export const useMongoosePlugin = () =>
  applyDecorators(plugin(autoPopulate), plugin(leanVirtuals));
