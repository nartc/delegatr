import { Inject } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export const redisConfiguration = registerAs('redis', () => ({
  isCacheEnabled: true,
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
}));

export const InjectRedisConfig = () => Inject(redisConfiguration.KEY);