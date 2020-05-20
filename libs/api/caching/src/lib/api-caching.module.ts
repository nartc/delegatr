import { redisConfiguration } from '@delegatr/api/config';
import { RedisConfig } from '@delegatr/api/types';
import { CacheModule, Global, Module } from '@nestjs/common';
import ioRedisStore from 'cache-manager-ioredis';
import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [redisConfiguration.KEY],
      useFactory: (redisConfig: RedisConfig) => ({
        store: ioRedisStore,
        host: redisConfig.host,
        port: redisConfig.port,
        ttl: Number(redisConfig.ttl),
      }),
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class ApiCachingModule {}
