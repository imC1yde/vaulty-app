import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '@src/common/decorators/current-user.decorator'
import { AuthGuard } from "@src/common/guards/auth.guard"
import type { IUserPayload } from '@src/common/interfaces/user-payload.interface'
import { IdPipe } from '@src/common/pipes/id.pipe'
import { NotEmptyPipe } from '@src/common/pipes/not-empty.pipe'
import { PaginatedItems, UserCatalogItem } from '@src/common/types/user-catalog-item.type'
import type { Nullable } from '@src/common/utilities/nullable.util'
import { CreateItemInput } from '@src/modules/catalog/user-catalog/inputs/create-item.input'
import { GetAllItemsInput } from '@src/modules/catalog/user-catalog/inputs/get-all-items.input'
import { UpdateItemInput } from '@src/modules/catalog/user-catalog/inputs/update-item.input'
import { UserCatalogService } from '@src/modules/catalog/user-catalog/user-catalog.service'
import { type FileUpload, GraphQLUpload } from 'graphql-upload-ts'

@UseGuards(AuthGuard)
@Resolver()
export class UserCatalogResolver {
  constructor(
    private readonly userCatalogService: UserCatalogService
  ) {}

  @Query(() => PaginatedItems, { name: 'getAllItems' })
  public async getAllItems(
    @CurrentUser() user: IUserPayload,
    @Args('input', { nullable: true }) input: GetAllItemsInput
  ): Promise<PaginatedItems> {
    return await this.userCatalogService.getAll(user.sub, input)
  }

  @Query(() => UserCatalogItem, { name: 'getItemById', nullable: true })
  public async getItemById(
    @CurrentUser() user: IUserPayload,
    @Args('id', IdPipe) id: string
  ): Promise<Nullable<UserCatalogItem>> {
    return await this.userCatalogService.getById(user.sub, id)
  }

  @Mutation(() => UserCatalogItem, { name: 'createItem' })
  public async createItem(
    @CurrentUser() user: IUserPayload,
    @Args('input') input: CreateItemInput,
    @Args('image', { type: () => GraphQLUpload }) image: FileUpload
  ): Promise<UserCatalogItem> {
    return await this.userCatalogService.create(user.sub, input, image)
  }


  @Mutation(() => UserCatalogItem, { name: 'updateItem' })
  public async updateItem(
    @CurrentUser() user: IUserPayload,
    @Args('input', NotEmptyPipe) input: UpdateItemInput,
    @Args('image', { type: () => GraphQLUpload }) image: FileUpload
  ): Promise<UserCatalogItem> {
    return await this.userCatalogService.update(user.sub, input, image)
  }

  @Mutation(() => UserCatalogItem, { name: 'deleteItem' })
  public async deleteItem(
    @CurrentUser() user: IUserPayload,
    @Args('id', IdPipe) id: string
  ): Promise<UserCatalogItem> {
    return await this.userCatalogService.delete(user.sub, id)
  }
}
