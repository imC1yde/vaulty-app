import { EsrbRating } from '@app/common'
import { EsrbRating as PrismaEsrb } from '@prisma/client'

// Maps Esrb rating from visual to Prisma format
export const mapEsrbToPrisma = (displayValue: string): PrismaEsrb => {
  const entry = Object.entries(EsrbRating).find(([ _, value ]) => value === displayValue)

  if (!entry) {
    throw new Error(`Invalid ESRB display value: ${displayValue}`)
  }

  return entry[0] as PrismaEsrb
}