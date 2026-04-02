import type { INestable } from '@src/common/interfaces/nestable.interface.ts'
import { motion } from 'framer-motion'
import { type FC, type ReactNode } from 'react'

interface IActionButtonProps extends INestable {
  onClick: () => void
  children: ReactNode
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
}

const ActionButton: FC<IActionButtonProps> = (props) => {
  return (
    <motion.button
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`
        relative group overflow-hidden cursor-pointer 
        flex flex-row items-center justify-center 
        bg-blue-600 text-white font-bold
        px-10 py-3.5 rounded-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        ${props.className}
      `}

      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 rounded-lg border-2 border-blue-400 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 blur-[2px]"/>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"/>
      <div className="absolute inset-0 rounded-lg border border-blue-300/50 pointer-events-none"/>
      <span className="relative z-10 flex items-center gap-3 tracking-wider uppercase text-sm">
        {props.children}
      </span>
      <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
    </motion.button>
  );
};

export default ActionButton