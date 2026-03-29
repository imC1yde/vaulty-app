import { Field, InputType } from '@nestjs/graphql'
import { PaginationInput } from '@src/common/strategies/pagination-input.strategy'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class GetRawgGamesInput extends PaginationInput() {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly search: string
}