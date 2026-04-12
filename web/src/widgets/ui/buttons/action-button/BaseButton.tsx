import { type HTMLMotionProps, motion } from 'framer-motion'
import type { FC, ReactNode } from 'react'

export interface IBaseButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode
  className?: string
  isLoading?: boolean
  variantClasses?: string
  glowClass?: string
}

const BaseButton: FC<IBaseButtonProps> =
  ({ children, className, variantClasses, glowClass, isLoading, ...props }) => {
    return (
      <motion.button
        {...props}
        disabled={props.disabled || isLoading}
        className={`
        relative group overflow-hidden cursor-pointer 
        flex flex-1 items-center justify-center 
        text-white font-bold rounded-xl border
        px-6 py-3 transition-all duration-300
        brightness-[0.8] hover:brightness-100 active:brightness-60
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses}
        ${className}
        `}
        whileTap={{ scale: 0.98 }}
      >
        <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-40 
        transition-opacity duration-500 blur-md pointer-events-none
        border-2 rounded-xl ${glowClass}
        `}/>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"/>
        </div>

        <span className="relative z-10 flex items-center justify-center gap-2 tracking-wider uppercase text-[11px] pointer-events-none shrink-0">
        {isLoading ? <div className="animate-spin">...</div> : children}
        </span>

        <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none group-hover:border-white/20 transition-colors z-20"/>
      </motion.button>
    )
  }

export default BaseButton