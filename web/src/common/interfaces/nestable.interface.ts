import type { Nullable } from '@src/common/utilities/nullable.util.ts'
import type { ReactNode } from 'react'

export interface INestable {
  readonly children?: Nullable<ReactNode>
}