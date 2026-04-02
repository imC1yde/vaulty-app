import { Args, Context, Mutation, Resolver } from "@nestjs/graphql"
import type { IGqlContext } from '@src/common/interfaces/gql-context.interface'
import { User } from '@src/common/types/user.type'
import type { Nullable } from '@src/common/utilities/nullable.util'
import { AuthService } from '@src/modules/core/auth/auth.service'
import { AuthorizeUserInput } from "@src/modules/core/auth/inputs/authorize-user.input"
import { RegisterUserInput } from "@src/modules/core/auth/inputs/register-user.input"

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: "registerUser", nullable: true })
  public async registerUser(
    @Args("input") input: RegisterUserInput
  ): Promise<Nullable<User>> {
    return await this.authService.register(input)
  }

  @Mutation(() => User, { name: "authorizeUser", nullable: true })
  public async authorizeUser(
    @Args("input") input: AuthorizeUserInput,
    @Context() context: IGqlContext
  ): Promise<Nullable<User>> {
    return await this.authService.authorize(input, context.res)
  }

  @Mutation(() => Boolean, { name: "signOut" })
  public async signOut(
    @Context() context: IGqlContext
  ): Promise<boolean> {
    return await this.authService.signOut(context.res)
  }
}
