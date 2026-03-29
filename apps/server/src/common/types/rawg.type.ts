import { type Nullable, RawgGame as CommonRawgGame } from '@app/common'
import { Field, ObjectType } from '@nestjs/graphql'
import { InheritPaginated } from '@src/common/strategies/inherit-paginated.strategy'

@ObjectType()
export class RawgGame extends CommonRawgGame {
  @Field(() => Number)
  declare rawgId: number

  @Field(() => String)
  declare name: string

  @Field(() => String, { nullable: true })
  declare backgroundImage: Nullable<string>
}

@ObjectType()
export class PaginatedRawgGames extends InheritPaginated(RawgGame) {}

@ObjectType()
export class PaginatedPlatforms extends InheritPaginated(String) {}

@ObjectType()
export class PaginatedGenres extends InheritPaginated(String) {}