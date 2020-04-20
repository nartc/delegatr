import { registerAs } from '@nestjs/config';

export const redisConfiguration = registerAs('redis', () => ({
  isCacheEnabled: true,
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
}));
