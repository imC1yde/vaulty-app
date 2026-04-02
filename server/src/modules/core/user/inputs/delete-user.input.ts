import { Field, InputType } from '@nestjs/graphql'
import { Password } from '@src/common/decorators/password.decorator'

@InputType()
export class DeleteUserInput {
  @Password()
  @Field(() => String)
  readonly password: string
}