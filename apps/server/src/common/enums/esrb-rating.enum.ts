import { registerEnumType } from '@nestjs/graphql'
import { EsrbRating } from '@prisma/web'

registerEnumType(EsrbRating, {
  name: 'EsrbRating'
})

export { EsrbRating }