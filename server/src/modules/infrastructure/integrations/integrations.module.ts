import { Module } from '@nestjs/common'
import { RawgModule } from '@src/modules/infrastructure/integrations/rawg-api/rawg.module'

@Module({
  imports: [
    RawgModule
  ],
  exports: [
    RawgModule
  ]
})
export class IntegrationsModule {}