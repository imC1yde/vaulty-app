import type { Nullable } from '@src/common/types/nullable.type.ts'
import type { ReactNode } from 'react'

export interface INestable {
  readonly children?: Nullable<ReactNode>
}