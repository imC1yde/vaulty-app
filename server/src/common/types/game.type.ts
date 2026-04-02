import { Field, Float, Int, ObjectType, PickType } from '@nestjs/graphql'
import { EsrbRating } from '@src/common/enums/esrb-rating.enum'
import { Paginated } from '@src/common/strategies/paginated.strategy'
import type { Nullable } from '@src/common/utilities/nullable.util'

@ObjectType()
export class Game {
  @Field(() => String)
  id: string

  @Field(() => Int)
  rawgId: number

  @Field(() => String)
  name: string

  @Field(() => Boolean)
  isCompleted: boolean

  @Field(() => String, { nullable: true })
  description: Nullable<string>

  @Field(() => String, { nullable: true })
  backgroundImage: Nullable<string>

  @Field(() => Float)
  rating: number

  @Field(() => Date, { nullable: true })
  released: Nullable<Date>

  @Field(() => EsrbRating, { nullable: true })
  esrbRating?: Nullable<EsrbRating>

  @Field(() => [ String ])
  genres: string[]

  @Field(() => [ String ])
  platforms: string[]
}

@ObjectType()
export class PartialGame extends PickType(Game, [
  'id',
  'name',
  'backgroundImage',
  'isCompleted',
  'rating',
  'platforms',
  'genres',
  'esrbRating'
]) {}

@ObjectType()
export class PaginatedGames extends Paginated(PartialGame) {}
