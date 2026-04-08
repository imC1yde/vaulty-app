import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { RedisConfig } from '@src/modules/infrastructure/config/redis.config'
import { RedisService } from '@src/modules/infrastructure/redis/redis.service'
import { redisStore } from 'cache-manager-redis-yet'

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ RedisConfig ],
      useFactory: async (config: RedisConfig) => {
        if (process.env.SKIP_CONNECTIONS === 'true') {
          return {
            ttl: 3_600_00
          }
        }

        return {
          store: await redisStore({
            url: `redis://${config.host}:${config.port}`,
            ttl: 3_600_000
          })
        }
      }
    })
  ],
  providers: [
    RedisService
  ],
  exports: [
    RedisService
  ]
})
export class RedisModule {}