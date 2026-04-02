import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '@src/common/decorators/current-user.decorator'
import { AuthGuard } from '@src/common/guards/auth.guard'
import type { IUserPayload } from '@src/common/interfaces/user-payload.interface'
import { IdPipe } from '@src/common/pipes/id.pipe'
import { NotEmptyPipe } from '@src/common/pipes/not-empty.pipe'
import { Game, PaginatedGames } from '@src/common/types/game.type'
import type { Nullable } from '@src/common/utilities/nullable.util'
import { GameCatalogService } from '@src/modules/catalog/game-catalog/game-catalog.service'
import { RawgDomainService } from '@src/modules/catalog/game-catalog/rawg/rawg-domain.service'
import { GetAllGamesFilterInput } from '@src/modules/catalog/game-catalog/shared/inputs/get-all-games.filter.input'
import { GetAllGamesInput } from '@src/modules/catalog/game-catalog/shared/inputs/get-all-games.input'
import { UpdateGameInput } from '@src/modules/catalog/game-catalog/shared/inputs/update-game.input'
import { mapResultToInput } from '@src/modules/catalog/game-catalog/shared/maps/result-to-input.map'

@UseGuards(AuthGuard)
@Resolver()
export class GameCatalogResolver {
  constructor(
    private readonly gameCatalogService: GameCatalogService,
    private readonly rawgService: RawgDomainService
  ) {}

  @Query(() => PaginatedGames, { name: 'getAllGames' })
  public async getAllGames(
    @CurrentUser() user: IUserPayload,
    @Args('input') input: GetAllGamesInput,
    @Args('filter', { nullable: true }) filter?: GetAllGamesFilterInput
  ): Promise<PaginatedGames> {
    return await this.gameCatalogService.getAll(user.sub, input, filter)
  }

  @Query(() => Game, { name: 'getGameById', nullable: true })
  public async getGameById(
    @CurrentUser() user: IUserPayload,
    @Args('id', IdPipe) id: string
  ): Promise<Nullable<Game>> {
    return await this.gameCatalogService.getById(user.sub, id)
  }

  @Mutation(() => Game, { name: 'updateGame' })
  public async updateGame(
    @CurrentUser() user: IUserPayload,
    @Args('input', NotEmptyPipe) input: UpdateGameInput
  ): Promise<Game> {
    return await this.gameCatalogService.update(user.sub, input)
  }

  @Mutation(() => Game, { name: 'deleteGame' })
  public async deleteGame(
    @CurrentUser() user: IUserPayload,
    @Args('id', IdPipe) id: string
  ): Promise<Game> {
    return await this.gameCatalogService.delete(user.sub, id)
  }

  @Mutation(() => Game, { name: 'createGame' })
  public async createGame(
    @CurrentUser() user: IUserPayload,
    @Args('id', IdPipe) id: number
  ): Promise<Game> {
    const game = await this.rawgService.getById(id)
    return await this.gameCatalogService.create(user.sub, mapResultToInput(game))
  }
}