import type { Nullable } from '../utilities/nullable.util'

export class UserCatalogItem {
  id: string
  name: string
  image: string
  description: Nullable<string>
}