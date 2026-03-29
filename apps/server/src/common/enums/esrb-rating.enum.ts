import { EsrbRating } from '@app/common'
import { EsrbRating as PrismaEsrb } from '@prisma/client'

export type UnionEsrbRating = EsrbRating | PrismaEsrb
