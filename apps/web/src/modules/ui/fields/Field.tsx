import type { FormErrors } from '@src/common/types/form-errors.type.ts'
import type { Nullable } from '@src/common/types/nullable.type.ts'
import { type FC, type InputHTMLAttributes } from 'react'

interface IFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label: string
  readonly target: string
  readonly onClear?: Nullable<() => void>,
  readonly errors: FormErrors
  readonly registry: any
}

const Field: FC<IFieldProps> = (props) => {

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={props.id}
        className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.2em] text-primary-text/60 peer-focus:text-secondary-text transition-colors px-1"
      >
        {props.label}
      </label>

      <div className="relative flex items-center w-full">
        <input
          {...props}
          className={`
          peer w-full bg-slate-950/40 border border-white/5 rounded-xl py-4 px-4
          text-sm text-slate-200 placeholder:text-slate-700
          transition-all outline-none ring-0
          focus:border-indigo-500/40 focus:bg-slate-900/60 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)]
          ${props.value ? 'pr-12' : 'pr-5'} 
          ${props.errors[props.target as keyof typeof props.errors]
            ? 'border-red-500/50 focus:border-red-500/80'
            : 'focus:border-indigo-500/40 focus:bg-slate-900/60 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)]'}
          ${props.className}`}
          {...props.registry}
        />
      </div>

      {props.errors[props.target as keyof typeof props.errors] && (
        <span className="text-[10px] text-red-500/80 font-medium px-2 mt-1 animate-in fade-in slide-in-from-top-1">
          {String(props.errors[props.target as keyof typeof props.errors]?.message ?? "")}
        </span>
      )}
    </div>
  )
}

export default Field