import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '@src/common/decorators/current-user.decorator'
import { AuthGuard } from '@src/common/guards/auth.guard'
import type { IUserPayload } from '@src/common/interfaces/user-payload.interface'
import { User } from '@src/common/types/user.type'
import type { Nullable } from '@src/common/utils/nullable.util'
import { FindUserInput } from '@src/core/user/inputs/find-user.input'
import { UpdateUserInput } from '@src/core/user/shared/inputs/update-user.input'
import { UserService } from './user.service';


@UseGuards(AuthGuard)
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true, name: 'findUser' })
  public async findUser(input: FindUserInput): Promise<Nullable<User>> {
    return await this.userService.find(input)
  }

  @Mutation(() => User, { name: 'updateUser' })
  public async updateUser(
    @CurrentUser() user: IUserPayload,
    @Args('input') input: UpdateUserInput
  ): Promise<User> {
    return await this.userService.update(user.sub, input)
  }

  @Mutation(() => User, { name: 'deleteUser' })
  public async deleteUser(@CurrentUser() user: IUserPayload): Promise<User> {
    return await this.userService.delete(user.sub)
  }
}
