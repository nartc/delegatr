import { BaseModel } from '@delegatr/api/common';
import {
  appConfiguration,
  authConfiguration,
  dbConfiguration,
  redisConfiguration,
} from '@delegatr/api/config';
import { ConfigType } from '@nestjs/config';
import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';

export type ModelType<T extends BaseModel> = ReturnModelType<
  AnyParamConstructor<T>
>;

export type AuthConfig = ConfigType<typeof authConfiguration>;
export type DbConfig = ConfigType<typeof dbConfiguration>;
export type AppConfig = ConfigType<typeof appConfiguration>;
export type RedisConfig = ConfigType<typeof redisConfiguration>;
