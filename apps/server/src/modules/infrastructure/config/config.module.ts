import { ConfigifyModule } from '@itgorillaz/configify'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    ConfigifyModule.forRootAsync({
      configFilePath: [ '.env' ]
    })
  ],
  exports: [ ConfigifyModule ]
})
export class ConfigModule {}