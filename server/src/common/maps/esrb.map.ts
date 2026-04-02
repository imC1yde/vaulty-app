import { InternalServerErrorException } from '@nestjs/common'
import { EsrbRating as PrismaEsrb } from '@prisma/client'
import { EsrbRating } from '@src/common/enums/esrb-rating.enum'

// Maps Esrb rating from visual to Prisma format
export const mapEsrbToPrisma = (esrb: string): PrismaEsrb => {
  const entry = Object.entries(EsrbRating).find(([ _, value ]) => value === esrb)
  if (!entry) throw new InternalServerErrorException(`Invalid ESRB value: ${esrb}`)

  return entry[0] as PrismaEsrb
}