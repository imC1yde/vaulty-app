import type { Nullable } from '@app/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { type Cache } from 'cache-manager'

@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {}

  public async get<TData>(key: string): Promise<Nullable<TData>> {
    try {
      return await this.cache.get(key) as TData
    } catch (_) {
      return null
    }
  }

  public async set<TData>(key: string, value: TData, ttl: number = 3_600_000): Promise<void> {
    try {
      await this.cache.set<TData>(key, value, ttl)
    } catch (_) {
      throw new BadRequestException(`Could not set ${key} in cache`)
    }
  }

  public async delete(key: string): Promise<void> {
    try {
      await this.cache.del(key)
    } catch (_) {
      throw new NotFoundException(`Could not delete ${key} in cache`)
    }
  }
}