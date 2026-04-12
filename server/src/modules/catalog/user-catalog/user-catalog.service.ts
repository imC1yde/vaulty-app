import { Injectable, NotFoundException } from '@nestjs/common'
import { PaginatedItems, UserCatalogItem } from '@src/common/types/user-catalog-item.type'
import type { Nullable } from '@src/common/utilities/nullable.util'
import { CreateItemInput } from "@src/modules/catalog/user-catalog/inputs/create-item.input"
import { GetAllItemsInput } from '@src/modules/catalog/user-catalog/inputs/get-all-items.input'
import { UpdateItemInput } from '@src/modules/catalog/user-catalog/inputs/update-item.input'
import { PrismaProvider } from "@src/modules/infrastructure/prisma/prisma.provider"
import { RedisService } from '@src/modules/infrastructure/redis/redis.service'
import { S3Service } from '@src/modules/infrastructure/s3/s3.service'
import { FileUpload } from 'graphql-upload-ts'

@Injectable()
export class UserCatalogService {
  constructor(
    private readonly prisma: PrismaProvider,
    private readonly redis: RedisService,
    private readonly s3Service: S3Service
  ) {}

  public async getAll(userId: string, input: GetAllItemsInput): Promise<PaginatedItems> {
    const { page, pageSize } = input
    const skip = pageSize * (page - 1)

    const [ items, count ] = await Promise.all([
      this.prisma.item.findMany({
        where: {
          userId: userId
        },
        select: {
          id: true,
          name: true,
          image: true,
          description: true
        },
        take: pageSize,
        skip: skip,
        orderBy: {
          name: 'asc'
        }
      }),
      this.prisma.item.count({
        where: {
          userId: userId
        }
      })
    ])

    const totalPages = Math.ceil(count / pageSize)
    const mappedItems = await Promise.all(
      items.map(async item => {
        const imageUrl = await this.s3Service.getImage(item.image)

        return {
          ...item,
          image: imageUrl
        }
      }))

    return {
      data: mappedItems,
      totalCount: count,
      totalPages: totalPages,
      hasNextPage: page < totalPages
    }
  }

  public async getById(userId: string, id: string): Promise<Nullable<UserCatalogItem>> {
    return await this.redis.wrap<Nullable<UserCatalogItem>>(
      RedisService.Keys.ITEMS.SINGLE(id),
      async () => {
        let item = await this.prisma.item.findUnique({
          where: {
            id: id,
            userId: userId
          },
          select: {
            id: true,
            name: true,
            image: true,
            description: true
          }
        })

        if (!item) return null
        const imageUrl = await this.s3Service.getImage(item.image)

        return {
          ...item,
          image: imageUrl
        }
      }
    )
  }

  public async create(userId: string, input: CreateItemInput, image: FileUpload): Promise<UserCatalogItem> {
    const { name, description } = input

    const imageKey = await this.s3Service.uploadImage(userId, image)

    await this.redis.deleteByPattern(RedisService.Patterns.ITEMS)

    return await this.prisma.item.create({
      data: {
        name: name,
        image: imageKey,
        description: description,
        user: {
          connect: {
            id: userId
          }
        }
      },
      select: {
        id: true,
        name: true,
        image: true,
        description: true
      }
    })
  }

  public async update(userId: string, input: UpdateItemInput, image: FileUpload): Promise<UserCatalogItem> {
    const { id, name, description } = input

    try {
      const item = await this.prisma.item.update({
        where: {
          id: id,
          userId: userId
        },
        data: {
          name: name ?? undefined,
          description: description
        },
        select: {
          id: true,
          name: true,
          image: true,
          description: true
        }
      })

      await this.s3Service.updateImage(item.image, image)

      await this.redis.delete(RedisService.Keys.ITEMS.SINGLE(id))
      await this.redis.deleteByPattern(RedisService.Patterns.ITEMS)

      return item
    } catch (error) {
      throw new NotFoundException(`Item not found`)
    }
  }

  public async delete(userId: string, id: string): Promise<UserCatalogItem> {
    try {
      const item = await this.prisma.item.delete({
        where: {
          id: id,
          userId: userId
        },
        select: {
          id: true,
          name: true,
          image: true,
          description: true
        }
      })

      await this.s3Service.delete(item.image)

      await this.redis.delete(RedisService.Keys.ITEMS.SINGLE(id))

      return item
    } catch (error) {
      throw new NotFoundException(`Item not found`)
    }
  }
}
