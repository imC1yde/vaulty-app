import { Module } from '@nestjs/common';
import { PrismaProvider } from '@src/modules/infrastructure/prisma/prisma.provider';

@Module({
  providers: [ PrismaProvider ],
  exports: [ PrismaProvider ]
})
export class PrismaModule {}
