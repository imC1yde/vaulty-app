import type { Type } from '@nestjs/common'
import { Field, Int, ObjectType } from '@nestjs/graphql'

// Creates an abstract class inherited out of provided
export const Paginated = <TData>(cls: Type<TData>) => {
  @ObjectType({ isAbstract: true })
  abstract class Base {
    @Field(() => [ cls ])
    data: TData[]

    @Field(() => Int)
    totalCount: number

    @Field(() => Int)
    totalPages: number

    @Field(() => Boolean)
    hasNextPage: boolean
  }

  return Base
}