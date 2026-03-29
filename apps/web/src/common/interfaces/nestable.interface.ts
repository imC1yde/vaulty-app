import type { Nullable } from '@app/common'
import type { ReactNode } from 'react'

export interface INestable {
  readonly children?: Nullable<ReactNode>
}