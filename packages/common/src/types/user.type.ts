import type { Nullable } from '../utilities/nullable.util'

export class User {
  id: string
  username: Nullable<string>
  email: string
}