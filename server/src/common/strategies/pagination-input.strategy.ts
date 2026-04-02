import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty } from 'class-validator'

export const PaginationInput = () => {
  @InputType({ isAbstract: true })
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