import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthGuard } from '@src/common/guards/auth.guard'
import { JwtStrategy } from '@src/common/strategies/jwt.strategy'
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
    PassportModule.register(
      { defaultStrategy: 'jwt' }
    ),
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
    RedisModule,
    JwtStrategy,
    AuthGuard
  ],
  providers: [
    JwtStrategy,
    AuthGuard
  ]
})
export class InfrastructureModule {}
