import { Module } from '@nestjs/common'
import { GameCatalogModule } from '@src/modules/catalog/game-catalog/game-catalog.module'
import { UserCatalogModule } from '@src/modules/catalog/user-catalog/user-catalog.module'

@Module({
  providers: [],
  imports: [
    UserCatalogModule,
    GameCatalogModule
  ]
})
export class CatalogModule {}
