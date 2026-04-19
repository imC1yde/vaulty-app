import { Injectable } from '@nestjs/common'
import { IRawgResponse } from '@src/common/interfaces/rawg-response.interface'
import { PaginatedGenres, PaginatedPlatforms, PaginatedRawgGames } from '@src/common/types/rawg.type'
import { GetAllGenresInput } from '@src/modules/catalog/game-catalog/rawg/shared/inputs/get-all-genres.input'
import { GetAllPlatformsInput } from '@src/modules/catalog/game-catalog/rawg/shared/inputs/get-all-platforms.input'
import { GetRawgGamesInput } from '@src/modules/catalog/game-catalog/rawg/shared/inputs/get-rawg-games.input'
import { mapRawgResponse } from '@src/modules/catalog/game-catalog/rawg/shared/maps/rawg-response.map'
import { mapRawgList } from '@src/modules/catalog/game-catalog/shared/maps/rawg-list.map'
import { RawgConfig } from '@src/modules/infrastructure/config/rawg-api.config'
import { RawgClient } from '@src/modules/infrastructure/integrations/rawg-api/rawg.client'
import { RedisService } from '@src/modules/infrastructure/redis/redis.service'
import { lastValueFrom, timer } from 'rxjs'

@Injectable()
export class RawgDomainService {
  constructor(
    private readonly rawgClient: RawgClient,
    private readonly rawgConfig: RawgConfig,
    private readonly redis: RedisService
  ) {}

  public async getAll(input: GetRawgGamesInput): Promise<PaginatedRawgGames> {
    const { search, page, pageSize } = input

    const data = await lastValueFrom(this.rawgClient.getData<IRawgResponse<any>>(
      `${this.rawgConfig.url}/games`,
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
      totalPages: totalPages <= 1000 ? totalPages : 1000,
      hasNextPage: (!!data.next) && totalPages <= 1000
    }
  }

  public async getById(id: number): Promise<any> {
    return await this.redis.wrap<any>(
      RedisService.Keys.RAWG.GAME(id),
      async () => {
        return await lastValueFrom(this.rawgClient.getData<any>(
          `${this.rawgConfig.url}/games/${id}`,
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
    )
  }

  public async getAllPlatforms(input: GetAllPlatformsInput): Promise<PaginatedPlatforms> {
    return await this.redis.wrap(
      RedisService.Keys.RAWG.PLATFORMS(input),
      async () => {
        const platforms = await lastValueFrom(this.rawgClient.getData<IRawgResponse<string>>(
          `${this.rawgConfig.url}/platforms`,
          {
            params: {
              key: this.rawgConfig.accessKey,
              page: input.page,
              page_size: input.pageSize
            }
          },
          {
            timeout: 3000,
            retryConfig: {
              count: 2,
              delay: (_, count) => timer(1000 * count)
            }
          }
        ))

        return mapRawgResponse<string>(platforms, 'name', input.pageSize)
      }
    )
  }

  public async getAllGenres(input: GetAllGenresInput): Promise<PaginatedGenres> {
    return await this.redis.wrap(
      RedisService.Keys.RAWG.GENRES(input),
      async () => {
        const genres = await lastValueFrom(this.rawgClient.getData<IRawgResponse<string>>(
          `${this.rawgConfig.url}/genres`,
          {
            params: {
              key: this.rawgConfig.accessKey,
              page: input.page,
              page_size: input.pageSize
            }
          },
          {
            timeout: 3000,
            retryConfig: {
              count: 2,
              delay: (_, count) => timer(1000 * count)
            }
          }
        ))

        return mapRawgResponse<string>(genres, 'name', input.pageSize)
      }
    )
  }
}