import type { Nullable } from "@src/common/utilities/nullable.util.ts"

export interface IUser {
  id: string
  username: Nullable<string>
  email: string
}