import type { Nullable } from '@src/common/utilities/nullable.util.ts'

export interface IUserCatalogItem {
  imageUrl: JSX.Element
  id: string
  name: string
  image: string
  description: Nullable<string>
}

