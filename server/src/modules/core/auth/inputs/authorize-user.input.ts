import { Field, InputType } from "@nestjs/graphql"
import { Email } from '@src/common/decorators/email.decorator'
import { Password } from '@src/common/decorators/password.decorator'
import { IsNotEmpty, IsString } from "class-validator"

@InputType()
export class AuthorizeUserInput {
  @IsString()
  @IsNotEmpty()
  @Email()
  @Field(() => String)
  readonly email: string

  @Password()
  @Field(() => String)
  readonly password: string
}