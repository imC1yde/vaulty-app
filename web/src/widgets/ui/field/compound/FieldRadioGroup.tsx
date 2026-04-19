import type { FC, HTMLAttributes } from 'react'

interface IFieldRadioGroup extends HTMLAttributes<HTMLDivElement> {}

const FieldRadioGroup: FC<IFieldRadioGroup> = ({ children, className, ...props }) => (
  <div className="space-y-2">
    <div className={`${className} flex gap-4`} {...props}>{children}</div>
  </div>
)

export default FieldRadioGroup