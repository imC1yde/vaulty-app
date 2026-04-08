import type { FC } from 'react'

interface IFieldErrorProps {
  error: any
}

const FieldError: FC<IFieldErrorProps> = ({ error }) => {
  if (!error) return

  return (
    <div className="min-h-[14px] flex items-center">
        <span className="
          block w-full
          text-[10px] text-red-500/90 font-semibold uppercase tracking-wider
          px-1
          animate-in fade-in slide-in-from-top-1 duration-200
        ">
          {error.message}
        </span>
    </div>
  )
}
export default FieldError