import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import type { Cache } from 'cache-manager'
import crypto from 'crypto'

@Injectable()
export class RedisService implements OnModuleInit {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {}

  public onModuleInit() {
    if (process.env.SKIP_CONNECTIONS === 'true') return
  }

  public static readonly Keys = {
    RAWG: {
      PLATFORMS: (input: Object) => `rawg:platforms:${RedisService.generatePaginationHash(input)}`,
      GENRES: (input: Object) => `rawg:genres:${RedisService.generatePaginationHash(input)}`,
      GAME: (id: number) => `rawg:games:${id}`,
      GAMES: (input: Object) => `rawg:games:${RedisService.generatePaginationHash(input)}`
    },
    GAME: {
      ALL: (input: Object) => `catalog:games:${RedisService.generatePaginationHash(input)}`,
      SINGLE: (id: string) => `catalog:games:${id}`
    },
    ITEMS: {
      ALL: (input: Object) => `catalog:items:${RedisService.generatePaginationHash(input)}`,
      SINGLE: (id: string) => `catalog:items:${id}`
    },
    USER: {
      SINGLE: (email: string) => `users:${email}`
    }
  } as const

  public static readonly Patterns = {
    GAMES: 'catalog:games*',
    ITEMS: 'catalog:items*',
    PLATFORMS: 'rawg:platforms*',
    RAWG_GAMES: 'rawg:games*',
    GENRES: 'rawg:genres*'
  } as const

  public async delete(key: string): Promise<void> {
    await this.cache.del(key)
  }

  public async deleteByPattern(pattern: string): Promise<void> {
    const store = this.cache.stores[0]
    await store.clear()
  }

  public async wrap<TData>(key: string, fn: () => Promise<TData>, ttl = 3_600_000): Promise<TData> {
    const cached = await this.cache.get<TData>(key)
    if (cached) return cached

    const result = await fn()
    await this.cache.set<TData>(key, result, ttl)
    return result
  }

  private static generatePaginationHash(args: Object): string {
    const sortedArgs = Object.keys(args)
      .sort()
      .reduce((acc, key) => {
        acc[key] = args[key]
        return acc
      }, {})

    return crypto
      .createHash('md5')
      .update(JSON.stringify(sortedArgs))
      .digest('hex')
      .slice(0, 10)
  }
}
