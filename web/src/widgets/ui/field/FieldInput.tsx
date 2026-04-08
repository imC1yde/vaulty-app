import type { IZodField } from '@src/widgets/ui/field/zod-field.interface.ts'
import type { FC, InputHTMLAttributes } from 'react'

interface IFieldInputProps extends InputHTMLAttributes<HTMLInputElement>, IZodField {}

const FieldInput: FC<IFieldInputProps> = ({ error, className, ...props }) => (
  <div className="relative flex items-center w-full h-full">
    <input
      {...props}
      className={`
        peer w-full bg-faded-dark/40 border rounded-xl py-3 px-4
        border-accent-glow
        text-sm text-slate-200 placeholder:text-slate-700
        transition-all outline-none ring-0
        focus:border-accent/40 focus:bg-faded-dark/60 focus:shadow-[0_0_20px_rgba(59,130,246,0.1)]
        ${error ? 'border-danger/50 focus:border-danger/80' : ''}
        ${className}`}
      {...props.registry}
    />
  </div>
)

export default FieldInput