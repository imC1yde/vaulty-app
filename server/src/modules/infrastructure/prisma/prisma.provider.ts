import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaProvider
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

  public async onModuleInit(): Promise<void> {
    if (process.env.SKIP_CONNECTIONS === 'true') return
    await this.$connect()
  }

  public async onModuleDestroy(): Promise<void> {
    if (process.env.SKIP_CONNECTIONS === 'true') return
    await this.$disconnect()
  }
}

