import { Field, ObjectType } from '@nestjs/graphql'
import { Paginated } from '@src/common/strategies/paginated.strategy'
import type { Nullable } from '@src/common/utilities/nullable.util'

@ObjectType()
export class RawgGame {
  @Field(() => Number)
  rawgId: number

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  backgroundImage: Nullable<string>
}

@ObjectType()
export class PaginatedRawgGames extends Paginated(RawgGame) {}

@ObjectType()
export class PaginatedPlatforms extends Paginated(String) {}

@ObjectType()
export class PaginatedGenres extends Paginated(String) {}