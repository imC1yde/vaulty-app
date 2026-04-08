import type { INestable } from '@src/common/interfaces/nestable.interface.ts'
import type { FC } from 'react'

interface IFieldLabelProps extends INestable {
  htmlFor?: string
}

const FieldLabel: FC<IFieldLabelProps> = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="text-[10px] uppercase font-bold tracking-[0.2em] text-softy/65 group-focus-within:text-accent/80 transition-colors px-1"
  >
    {children}
  </label>
)

export default FieldLabel