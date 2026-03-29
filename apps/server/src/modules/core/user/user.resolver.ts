import { type Nullable } from '@app/common'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '@src/common/decorators/current-user.decorator'
import { AuthGuard } from '@src/common/guards/auth.guard'
import type { IUserPayload } from '@src/common/interfaces/user-payload.interface'
import { NotEmptyPipe } from '@src/common/pipes/not-empty.pipe'
import { User } from '@src/common/types/user.type'
import { DeleteUserInput } from '@src/modules/core/user/inputs/delete-user.input'
import { GetUserInput } from '@src/modules/core/user/inputs/get-user.input'
import { UpdateUserInput } from '@src/modules/core/user/inputs/update-user.input'
import { UserService } from '@src/modules/core/user/user.service';

@UseGuards(AuthGuard)
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true, name: 'getUser' })
  public async getUser(
    @Args('input') input: GetUserInput
  ): Promise<Nullable<User>> {
    return await this.userService.getByEmail(input)
  }

  @Mutation(() => User, { name: 'updateUser' })
  public async updateUser(
    @CurrentUser() user: IUserPayload,
    @Args('input', NotEmptyPipe) input: UpdateUserInput
  ): Promise<User> {
    return await this.userService.update(user.sub, input)
  }

  @Mutation(() => User, { name: 'deleteUser' })
  public async deleteUser(
    @CurrentUser() user: IUserPayload,
    @Args('input') input: DeleteUserInput
  ): Promise<User> {
    return await this.userService.delete(user.sub, input)
  }
}
