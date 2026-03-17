import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { RawgDomainService } from '@src/catalog/game-catalog/rawg/rawg-domain.service'
import { GetRawgGamesInput } from '@src/catalog/game-catalog/rawg/shared/inputs/get-rawg-games.input'
import { PaginatedRawgGames } from '@src/catalog/game-catalog/rawg/shared/types/paginated-rawg-games.type'
import { AuthGuard } from '@src/common/guards/auth.guard'


@UseGuards(AuthGuard)
@Resolver()
export class RawgDomainResolver {
  constructor(private readonly rawgService: RawgDomainService) {}

  @Query(() => PaginatedRawgGames, { name: 'getRawgGames' })
  public async getRawgGames(@Args('input') input: GetRawgGamesInput): Promise<PaginatedRawgGames> {
    return await this.rawgService.getAll(input)
  }
}