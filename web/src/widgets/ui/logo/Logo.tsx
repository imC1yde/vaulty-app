import { type FC } from 'react'

const Logo: FC = () => {
  return (
    <div className="z-51 group flex items-center cursor-pointer select-none">
      <h1 className="
        text-4xl md:text-5xl font-black tracking-tighter
        bg-gradient-to-r from-[#007BFF] via-[#3b82f6] to-[#6F42C1]
        bg-clip-text text-transparent
        relative inline-block pb-1 overflow-y-hidden
        transition-all duration-500 group-hover:brightness-125">
        Vaulty
      </h1>
    </div>
  )
}

export default Logo