import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { mapArray } from '@src/common/maps/array.map'
import { mapEsrbToPrisma } from '@src/common/maps/esrb.map'
import { Game, PaginatedGames } from '@src/common/types/game.type'
import type { Nullable } from '@src/common/utilities/nullable.util'
import { CreateGameInput } from '@src/modules/catalog/game-catalog/shared/inputs/create-game.input'
import { GetAllGamesFilterInput } from '@src/modules/catalog/game-catalog/shared/inputs/get-all-games.filter.input'
import { GetAllGamesInput } from '@src/modules/catalog/game-catalog/shared/inputs/get-all-games.input'
import { UpdateGameInput } from '@src/modules/catalog/game-catalog/shared/inputs/update-game.input'
import { mapGame } from '@src/modules/catalog/game-catalog/shared/maps/game.map'
import { mapGamesList } from '@src/modules/catalog/game-catalog/shared/maps/games-list.map'
import { PrismaProvider } from '@src/modules/infrastructure/prisma/prisma.provider'
import { RedisService } from '@src/modules/infrastructure/redis/redis.service'

@Injectable()
export class GameCatalogService {
  constructor(
    private readonly prisma: PrismaProvider,
    private readonly redis: RedisService
  ) {}

  public async create(userId: string, input: CreateGameInput): Promise<Game> {
    const platforms = mapArray(input.platforms)
    const genres = mapArray(input.genres)
    const released = input.released ? input.released + 'T00:00:00.000Z' : null
    const esrbRating = mapEsrbToPrisma(input.esrbRating as string)

    const game = await this.prisma.game.upsert({
      where: {
        rawgId: input.rawgId
      },
      update: {},
      create: {
        rawgId: input.rawgId,
        name: input.name,
        slug: input.slug,
        description: input.description ?? null,
        backgroundImage: input.backgroundImage ?? null,
        rating: input.rating,
        released: released,
        esrbRating: esrbRating,
        platforms: platforms,
        genres: genres
      }
    })

    const inventory = await this.prisma.gameInventory.upsert({
      where: {
        gameId_userId: {
          userId: userId,
          gameId: game.id
        }
      },
      update: {},
      create: {
        userId: userId,
        gameId: game.id,
        isCompleted: false
      },
      select: {
        isCompleted: true
      }
    })

    await this.redis.deleteByPattern(RedisService.Patterns.GAMES)

    return mapGame({
      data: game,
      isCompleted: inventory.isCompleted
    })
  }

  public async getAll(userId: string, input: GetAllGamesInput, filter?: GetAllGamesFilterInput): Promise<PaginatedGames> {
    return await this.redis.wrap<PaginatedGames>(
      RedisService.Keys.GAME.ALL({
        ...input,
        ...filter
      }),
      async () => {
        const { page, pageSize } = input
        const skip = pageSize * (page - 1)

        const [ inventory, count ] = await Promise.all([
          this.prisma.gameInventory.findMany({
            where: {
              userId: userId,
              isCompleted: filter?.isCompleted ? { equals: filter.isCompleted } : undefined,
              game: {
                slug: filter?.name ? { contains: filter.name, mode: 'insensitive' } : undefined,
                rating: filter?.rating ? { gte: filter.rating } : undefined,
                esrbRating: filter?.esrbRating ? { equals: mapEsrbToPrisma(filter.esrbRating) } : undefined,
                genres: filter?.genres?.length ? { hasSome: filter.genres } : undefined,
                platforms: filter?.platforms?.length ? { hasSome: filter.platforms } : undefined
              }
            },
            include: {
              game: true
            },
            take: pageSize,
            skip: skip,
            orderBy: {
              game: {
                name: 'asc'
              }
            }
          }),
          this.prisma.gameInventory.count({
            where: {
              userId: userId,
              isCompleted: filter?.isCompleted ? { equals: filter.isCompleted } : undefined,
              game: {
                slug: filter?.name ? { contains: filter.name, mode: 'insensitive' } : undefined,
                rating: filter?.rating ? { gte: filter.rating } : undefined,
                esrbRating: filter?.esrbRating ? { equals: mapEsrbToPrisma(filter.esrbRating) } : undefined,
                genres: filter?.genres?.length ? { hasSome: filter.genres } : undefined,
                platforms: filter?.platforms?.length ? { hasSome: filter.platforms } : undefined
              }
            }
          })
        ])

        const totalPages = Math.ceil(count / pageSize)
        const mappedGame = mapGamesList(inventory)

        return {
          data: mappedGame,
          totalPages: totalPages,
          totalCount: count,
          hasNextPage: page < totalPages
        }
      }
    )
  }

  public async getById(userId: string, id: string): Promise<Nullable<Game>> {
    return await this.redis.wrap<Nullable<Game>>(
      RedisService.Keys.GAME.SINGLE(id),
      async () => {
        const inventory = await this.prisma.gameInventory.findUnique({
          where: {
            gameId_userId: {
              gameId: id,
              userId: userId
            }
          },
          include: {
            game: true
          }
        })

        if (!inventory) throw new NotFoundException('Game not found')

        return mapGame({
          data: inventory.game,
          isCompleted: inventory.isCompleted
        })
      }
    )
  }

  public async update(userId: string, input: UpdateGameInput): Promise<Game> {
    const { id, isCompleted } = input

    try {
      const inventory = await this.prisma.gameInventory.update({
        where: {
          gameId_userId: {
            gameId: id,
            userId: userId
          }
        },
        data: {
          isCompleted: isCompleted
        },
        include: {
          game: true
        }
      })

      await this.redis.delete(RedisService.Keys.GAME.SINGLE(id))
      await this.redis.deleteByPattern(RedisService.Patterns.GAMES)

      return mapGame({
        data: inventory.game,
        isCompleted: inventory.isCompleted
      })
    } catch (error) {
      throw new InternalServerErrorException(`Game updating failed.`)
    }
  }

  public async delete(userId: string, id: string): Promise<Game> {
    try {
      const inventory = await this.prisma.gameInventory.delete({
        where: {
          gameId_userId: {
            gameId: id,
            userId: userId
          }
        },
        include: {
          game: true
        }
      })

      await this.redis.delete(RedisService.Keys.GAME.SINGLE(id))

      return mapGame({
        data: inventory.game,
        isCompleted: inventory.isCompleted
      })
    } catch (error) {
      throw new InternalServerErrorException(`Game deleting failed.`)
    }
  }
}