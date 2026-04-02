import { Module } from '@nestjs/common'
import { UserCatalogResolver } from '@src/modules/catalog/user-catalog/user-catalog.resolver'
import { UserCatalogService } from '@src/modules/catalog/user-catalog/user-catalog.service'

@Module({
  providers: [
    UserCatalogService,
    UserCatalogResolver
  ]
})
export class UserCatalogModule {}
