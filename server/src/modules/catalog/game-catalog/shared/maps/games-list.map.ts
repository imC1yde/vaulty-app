import { EsrbRating } from '@src/common/enums/esrb-rating.enum'

export const mapGamesList = (inventory: any) => {
  return inventory.map(
    ({ isCompleted, game }) => ({
      id: game.id,
      name: game.name,
      backgroundImage: game.backgroundImage,
      isCompleted: isCompleted,
      rating: game.rating,
      platforms: game.platforms,
      genres: game.genres,
      esrbRating: game.esrbRating ? EsrbRating[game.esrbRating] : undefined
    }))
}