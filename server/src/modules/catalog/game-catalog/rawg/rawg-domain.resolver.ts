import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { AuthGuard } from '@src/common/guards/auth.guard'
import { PaginatedGenres, PaginatedPlatforms, PaginatedRawgGames } from '@src/common/types/rawg.type'
import { RawgDomainService } from '@src/modules/catalog/game-catalog/rawg/rawg-domain.service'
import { GetAllGenresInput } from '@src/modules/catalog/game-catalog/rawg/shared/inputs/get-all-genres.input'
import { GetAllPlatformsInput } from '@src/modules/catalog/game-catalog/rawg/shared/inputs/get-all-platforms.input'
import { GetRawgGamesInput } from '@src/modules/catalog/game-catalog/rawg/shared/inputs/get-rawg-games.input'

@UseGuards(AuthGuard)
@Resolver()
export class RawgDomainResolver {
  constructor(private readonly rawgService: RawgDomainService) {}

  @Query(() => PaginatedRawgGames, { name: 'getRawgGames' })
  public async getRawgGames(
    @Args('input') input: GetRawgGamesInput
  ): Promise<PaginatedRawgGames> {
    return await this.rawgService.getAll(input)
  }

  @Query(() => PaginatedPlatforms, { name: 'getAllPlatforms' })
  public async getAllPlatforms(
    @Args('input') input: GetAllPlatformsInput
  ): Promise<PaginatedPlatforms> {
    return await this.rawgService.getAllPlatforms(input)
  }

  @Query(() => PaginatedGenres, { name: 'getAllGenres' })
  public async getAllGenres(
    @Args('input') input: GetAllGenresInput
  ): Promise<PaginatedGenres> {
    return await this.rawgService.getAllGenres(input)
  }
}