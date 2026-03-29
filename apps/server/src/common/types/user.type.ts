import { type Nullable, User as CommonUser } from '@app/common'
import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class User extends CommonUser {
  @Field(() => String)
  declare id: string

  @Field(() => String, { nullable: true })
  declare username: Nullable<string>

  @Field(() => String)
  declare email: string
}