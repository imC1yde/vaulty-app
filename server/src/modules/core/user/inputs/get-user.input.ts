import { Field, InputType } from '@nestjs/graphql'
import { Email } from '@src/common/decorators/email.decorator'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class GetUserInput {
  @IsString()
  @IsNotEmpty()
  @Email()
  @Field(() => String)
  readonly email: string
}