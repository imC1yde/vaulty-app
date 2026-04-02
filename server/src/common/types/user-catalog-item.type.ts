import { Field, ObjectType } from '@nestjs/graphql'
import { Paginated } from '@src/common/strategies/paginated.strategy'
import { type Nullable } from '@src/common/utilities/nullable.util'

@ObjectType()
export class UserCatalogItem {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  image: string

  @Field(() => String, { nullable: true })
  description: Nullable<string>
}

@ObjectType()
export class PaginatedItems extends Paginated(UserCatalogItem) {}