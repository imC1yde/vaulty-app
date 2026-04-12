import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface IMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
  variant?: 'ghost' | 'destructive'
}

const MenuButton: FC<IMenuButtonProps> = ({ children, icon, variant = 'ghost', className, ...props }) => {
  const variants = {
    ghost: "text-faded-text/80 hover:bg-white/5 hover:text-white",
    destructive: "text-red-400/90 hover:bg-red-500/20 hover:text-red-400"
  }

  return (
    <button
      {...props}
      className={`
        w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 outline-none group font-medium text-sm
        ${variants[variant]}
        ${className}
        `}
    >
      <span>{children}</span>
      {icon &&
				<div className="opacity-60 group-hover:opacity-100 transition-opacity">{icon}</div>}
    </button>
  )
}

export default MenuButton