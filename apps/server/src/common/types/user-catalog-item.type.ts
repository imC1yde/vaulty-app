import { type Nullable, UserCatalogItem as CommonUserCatalogItem } from '@app/common'
import { Field, ObjectType } from '@nestjs/graphql'
import { InheritPaginated } from '@src/common/strategies/inherit-paginated.strategy'

@ObjectType()
export class UserCatalogItem extends CommonUserCatalogItem {
  @Field(() => String)
  declare id: string

  @Field(() => String)
  declare name: string

  @Field(() => String)
  declare image: string

  @Field(() => String, { nullable: true })
  declare description: Nullable<string>
}

@ObjectType()
export class PaginatedItems extends InheritPaginated(UserCatalogItem) {}