import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IsInt, IsNotEmpty } from 'class-validator'

export const PaginationInput = () => {
  @ObjectType({ isAbstract: true })
  abstract class Base {
    @IsInt()
    @IsNotEmpty()
    @Field(() => Int)
    readonly page: number

    @IsInt()
    @IsNotEmpty()
    @Field(() => Int)
    readonly pageSize: number
  }

  return Base
}