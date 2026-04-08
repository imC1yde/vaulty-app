import type { IZodField } from '@src/widgets/ui/field/zod-field.interface.ts'
import type { FC, TextareaHTMLAttributes } from 'react'

interface IFieldTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, IZodField {}

const FieldTextarea: FC<IFieldTextareaProps> = ({ error, className, registry, ...props }) => {
  return (
    <div className="relative flex items-center w-full">
      <textarea
        {...props}
        {...registry}
        className={`
          peer w-full min-h-[120px] resize-y
          bg-faded-dark/40 border rounded-xl py-3 px-4
          border-accent-glow
          text-sm text-slate-200 placeholder:text-slate-700
          transition-all outline-none ring-0
          focus:border-accent/40 focus:bg-faded-dark/60 focus:shadow-[0_0_20px_rgba(59,130,246,0.1)]
          ${error ? 'border-danger/50 focus:border-danger/80' : ''}
          ${className}`}
      />
    </div>
  )
}

export default FieldTextarea