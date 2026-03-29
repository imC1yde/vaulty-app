import { EsrbRating, Game as CommonGame, type Nullable, PartialGame as CommonPartialGame } from '@app/common'
import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { InheritPaginated } from '@src/common/strategies/inherit-paginated.strategy'

@ObjectType()
export class Game extends CommonGame {
  @Field(() => String)
  declare id: string

  @Field(() => Int)
  declare rawgId: number

  @Field(() => String)
  declare name: string

  @Field(() => Boolean)
  declare isCompleted: boolean

  @Field(() => String, { nullable: true })
  declare description: Nullable<string>

  @Field(() => String, { nullable: true })
  declare backgroundImage: Nullable<string>

  @Field(() => Float)
  declare rating: number

  @Field(() => Date, { nullable: true })
  declare released: Nullable<Date>

  @Field(() => EsrbRating, { nullable: true })
  declare esrbRating?: Nullable<EsrbRating>

  @Field(() => [ String ])
  declare genres: string[]

  @Field(() => [ String ])
  declare platforms: string[]
}

@ObjectType()
export class PartialGame extends CommonPartialGame {}

@ObjectType()
export class PaginatedGames extends InheritPaginated(PartialGame) {}
