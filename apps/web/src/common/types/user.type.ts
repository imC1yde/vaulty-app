import type { Nullable } from '@src/common/types/nullable.type.ts'

export type User = {
  id: string
  username: Nullable<string>
  email: string
}