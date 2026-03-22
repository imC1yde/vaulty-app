import { Field, InputType } from '@nestjs/graphql'
import { EMAIL_REGEX } from '@src/common/constants/regex.constants'
import { IsNotEmpty, IsString, Matches } from 'class-validator'

@InputType()
export class FindUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Matches(EMAIL_REGEX)
  readonly email: string
}