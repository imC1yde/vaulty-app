import { createKeyv } from '@keyv/redis'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { AppConfig } from '@src/modules/infrastructure/config/app.config'
import { RedisConfig } from '@src/modules/infrastructure/config/redis.config'
import { RedisService } from '@src/modules/infrastructure/redis/redis.service'

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ RedisConfig ],
      useFactory: async (config: RedisConfig, app: AppConfig) => ({
        stores: [
          createKeyv(`redis://${config.host}:${config.port}`)
        ],
        ttl: 3_600_000
      })
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