import { Field, InputType } from '@nestjs/graphql'
import type { Nullable } from '@src/common/utilities/nullable.util'
import { IsOptional, IsString, MaxLength } from 'class-validator'

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsOptional()
  @MaxLength(32)
  @Field(() => String, { nullable: true })
  readonly username: Nullable<string>
}