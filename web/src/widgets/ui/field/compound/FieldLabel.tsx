import type { FC, HTMLAttributes } from 'react'

interface IFieldLabelProps extends HTMLAttributes<HTMLLabelElement> {
  readonly htmlFor?: string
}

const FieldLabel: FC<IFieldLabelProps> = ({ children, htmlFor, className, ...props }) => (
  <label
    htmlFor={htmlFor}
    className={`${className} text-[10px] uppercase font-bold tracking-[0.2em] text-softy/65 group-focus-within:text-accent/80 transition-colors px-1`}
    {...props}
  >
    {children}
  </label>
)

export default FieldLabel