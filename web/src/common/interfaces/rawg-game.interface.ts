import type { Nullable } from '@src/common/utilities/nullable.util.ts'

export interface IRawgGame {
  rawgId: number
  name: string
  backgroundImage: Nullable<string>
}
