import { Constructor, Paginated } from '@app/common'
import { Field, Int, ObjectType } from '@nestjs/graphql'

// Creates an abstract class inherited out of provided
export const InheritPaginated = <TData>(cls: Constructor<TData>) => {
  @ObjectType({ isAbstract: true })
  abstract class GQLPaginated extends Paginated<TData> {
    @Field(() => [ cls ])
    declare data: TData[]

    @Field(() => Int)
    declare totalCount: number

    @Field(() => Int)
    declare totalPages: number

    @Field(() => Boolean)
    declare hasNextPage: boolean
  }

  return GQLPaginated
}