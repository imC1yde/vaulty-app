import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@src/modules/infrastructure/config/config.module'
import { JwtConfig } from '@src/modules/infrastructure/config/jwt.config'
import { IntegrationsModule } from '@src/modules/infrastructure/integrations/integrations.module'
import { PrismaModule } from '@src/modules/infrastructure/prisma/prisma.module'
import { RedisModule } from '@src/modules/infrastructure/redis/redis.module'
import { S3Module } from '@src/modules/infrastructure/s3/s3.module'

@Global()
@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    IntegrationsModule,
    S3Module,
    RedisModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ JwtConfig ],
      useFactory: (config: JwtConfig) => ({
        secret: config.jwtSecret,
        signOptions: {
          expiresIn: '5d'
        }
      })
    })
  ],
  exports: [
    ConfigModule,
    PrismaModule,
    IntegrationsModule,
    S3Module,
    RedisModule
  ]
})
export class InfrastructureModule {}
