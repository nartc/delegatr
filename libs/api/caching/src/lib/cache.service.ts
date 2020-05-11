import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getCache<TType = unknown>(
    cacheKey: string,
    cb: () => Promise<TType>,
    ttl?: number
  ): Promise<TType> {
    return this.cacheManager.wrap(cacheKey, cb, { ttl });
  }

  async clear(cacheKey: string) {
    return await this.cacheManager.del(cacheKey);
  }
}
