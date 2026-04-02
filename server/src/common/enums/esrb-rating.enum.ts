import { registerEnumType } from '@nestjs/graphql'

export const EsrbRating = {
  EVERYONE: "Everyone",
  EVERYONE_10_PLUS: "Everyone 10+",
  TEEN: "Teen",
  MATURE: "Mature",
  ADULTS_ONLY: "Adults Only",
  RATING_PENDING: "Rating Pending"
} as const

export type EsrbRating = typeof EsrbRating[keyof typeof EsrbRating]

registerEnumType(EsrbRating, {
  name: 'EsrbRating'
})