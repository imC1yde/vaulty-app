import { EsrbRating } from '@src/common/enums/esrb-rating.enum.ts'
import type { Nullable } from '@src/common/utilities/nullable.util.ts'

export interface IGame {
  id: string
  rawgId: number
  name: string
  isCompleted: boolean
  description: Nullable<string>
  // Image 1200x400px
  backgroundImage: Nullable<string>
  rating: number
  released: Nullable<Date>
  esrbRating?: Nullable<EsrbRating>
  genres: string[]
  platforms: string[]
}

export interface IPartialGame {
  id: string
  rawgId: number
  name: string
  isCompleted: boolean
  description: Nullable<string>
  backgroundImage: Nullable<string>
  rating: number
  esrbRating?: Nullable<EsrbRating>
  genres: string[]
  platforms: string[]
}

