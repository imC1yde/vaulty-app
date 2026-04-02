import { Module } from '@nestjs/common'
import { RawgDomainResolver } from '@src/modules/catalog/game-catalog/rawg/rawg-domain.resolver'
import { RawgDomainService } from '@src/modules/catalog/game-catalog/rawg/rawg-domain.service'

@Module({
  providers: [
    RawgDomainService,
    RawgDomainResolver
  ],
  exports: [
    RawgDomainService
  ]
})
export class RawgDomainModule {}