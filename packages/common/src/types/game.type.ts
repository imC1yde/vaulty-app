import { EsrbRating } from '../enums/esrb-rating.enum'
import { PickClass } from '../strategies/pick-class.strategy'
import type { Nullable } from '../utilities/nullable.util'

export class Game {
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

export class PartialGame extends PickClass(Game, [
  'id',
  'name',
  'backgroundImage',
  'isCompleted',
  'rating',
  'platforms',
  'genres',
  'esrbRating'
]) {}
