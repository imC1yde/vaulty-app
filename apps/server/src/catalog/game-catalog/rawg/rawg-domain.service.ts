import { Injectable } from '@nestjs/common'
import { GetRawgGamesInput } from '@src/catalog/game-catalog/rawg/shared/inputs/get-rawg-games.input'
import { PaginatedRawgGames } from '@src/catalog/game-catalog/rawg/shared/types/paginated-rawg-games.type'
import { IRawgContent } from '@src/catalog/game-catalog/shared/interfaces/rawg-content.interface'
import { mapRawgList } from '@src/catalog/game-catalog/shared/maps/rawg-list.map'
import { RawgConfig } from '@src/infrastructure/config/rawg-api.config'
import { RawgClient } from '@src/infrastructure/integrations/rawg-api/rawg.client'
import { lastValueFrom, timer } from 'rxjs'

@Injectable()
export class RawgDomainService {
  constructor(
    private readonly rawgClient: RawgClient,
    private readonly rawgConfig: RawgConfig
  ) {}

  public async getAll(input: GetRawgGamesInput): Promise<PaginatedRawgGames> {
    const { search, page, pageSize } = input

    const data = await lastValueFrom(this.rawgClient.getData<IRawgContent<any>>(
      this.rawgConfig.url,
      {
        params: {
          key: this.rawgConfig.accessKey,
          search: search,
          page: page,
          page_size: pageSize
        }
      },
      {
        timeout: 3000,
        retryConfig: {
          count: 3,
          delay: (_, count) => timer(1000 * count)
        }
      }
    ))

    const totalPages = Math.ceil(data.count / pageSize)

    return {
      data: mapRawgList(data.results),
      totalCount: data.count,
      totalPages: totalPages <= 0 ? totalPages : 1000,
      hasNextPage: (!!data.next) && totalPages <= 1000
    }
  }

  public async getById(id: number): Promise<any> {
    return await lastValueFrom(this.rawgClient.getData<any>(
      `${this.rawgConfig.url}/${id}`,
      {
        params: {
          key: this.rawgConfig.accessKey
        }
      },
      {
        timeout: 3000,
        retryConfig: {
          count: 3,
          delay: (_, count) => timer(1000 * count)
        }
      }
    ))
  }
}