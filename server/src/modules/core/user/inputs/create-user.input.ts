import { Field, InputType } from '@nestjs/graphql'
import { Email } from '@src/common/decorators/email.decorator'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @Email()
  @Field(() => String)
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  readonly hashed: string
}