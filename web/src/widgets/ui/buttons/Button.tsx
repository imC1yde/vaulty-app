import { type HTMLMotionProps, motion } from 'framer-motion'
import type { FC, ReactNode } from 'react'

interface IButtonProps extends HTMLMotionProps<'button'> {
  readonly children: ReactNode
}

const Button: FC<IButtonProps> = ({ children, onClick, disabled, className = "", ...props }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled ?? false}
      className={`
        px-6 py-2.5 
        flex-1 w-full 
        flex flex-row items-center justify-center gap-3 
        bg-secondary-bg border border-accent/30 hover:border-accent rounded-lg
        cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
        duration-200 transition-all
        ${className} 
      `}
      initial={{
        outline: "1.5px solid #27277300",
        boxShadow: "0px 0px 0px rgba(11, 76, 138, 0)"
      }}
      whileHover={{
        outline: "1.5px solid #272773",
        boxShadow: "0px 0px 15px 2px rgba(11, 76, 138, 0.4)"
      }}
      whileTap={{
        scale: 0.96,
        outline: "2px solid #0B4C8AB1"
      }}
      transition={{
        type: 'tween',
        duration: 0.1,
        ease: "easeOut"
      }}
      {...props}
    >
      <div className="relative z-10 flex flex-row items-center justify-center gap-2 w-full">
        {children}
      </div>
    </motion.button>
  )
}

export default Button