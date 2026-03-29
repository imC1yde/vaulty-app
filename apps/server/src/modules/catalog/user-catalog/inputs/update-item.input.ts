import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString, MaxLength } from 'class-validator'
import type { Nullable } from 'packages/common'

@InputType()
export class UpdateItemInput {
  @IsString()
  @Field(() => String)
  readonly id: string

  @IsString()
  @IsOptional()
  @MaxLength(128)
  @Field(() => String, { nullable: true })
  readonly name: Nullable<string>

  @IsString()
  @IsOptional()
  @MaxLength(1024)
  @Field(() => String, { nullable: true })
  readonly description: Nullable<string>
}