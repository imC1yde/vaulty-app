import { RawgGame } from '@src/common/types/rawg.type'

export const mapRawgList = (result: any[]) => {
  return result.map(item => ({
    rawgId: item.id,
    name: item.name,
    backgroundImage: item?.background_image
  })) as RawgGame[]
}