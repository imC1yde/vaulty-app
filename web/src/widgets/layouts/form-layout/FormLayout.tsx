import { BaseRoutes } from '@src/common/enums/routes.enum.ts'
import type { INestable } from '@src/common/interfaces/nestable.interface.ts'
import MenuButton from '@src/widgets/ui/buttons/MenuButton.tsx'
import { MoveLeft } from 'lucide-react'
import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface IFormLayoutProps extends INestable {
  readonly heading: string
}

const FormLayout: FC<IFormLayoutProps> = ({ children, heading }) => {
  const navigate = useNavigate()
  const buttonHandler = () => navigate(BaseRoutes.HOME)

  return (
    <div
      className="relative min-h-dvh w-full flex items-center justify-center py-12 overflow-x-hidden"
      style={{
        background: `linear-gradient(165deg, 
          var(--color-gradient-start) 0%, 
          var(--color-gradient-mid) 44%, 
          var(--color-gradient-end) 100%)`
      }}
    >
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20">
        <MenuButton
          onClick={buttonHandler}
          className="bg-transparent border-none outline-none shadow-none text-primary-text/40 hover:text-primary-text/90
          hover:bg-white/7 transition-all duration-300 px-4 py-2 rounded-lg"
        >
          <div className="flex items-center gap-2 leading-none">
            <MoveLeft className="w-4 h-4 sm:w-5 sm:h-5"/>
            <span className="text-[13px] sm:text-[15px] font-medium tracking-[0.06em] capitalize">На главную</span>
          </div>
        </MenuButton>
      </div>

      <div className="flex flex-col items-center w-full px-4 max-w-2xl">

        <h1 className="mb-12 text-4xl md:text-5xl font-semibold tracking-wide text-primary-text/90 capitalize">
          {heading}
        </h1>

        <div className="
          w-full max-w-[480px]
          bg-secondary-bg/20 backdrop-blur-2xl
          ring-1 ring-main-glow/35
          rounded-[2rem]
          shadow-[0_20px_80px_rgba(0,0,0,0.4)]
          flex flex-col
          p-10 md:p-14 mb-1
          relative
          z-10
          border border-white/5
        ">
          <div className="w-full flex flex-col gap-10">
            {children}
          </div>
        </div>

      </div>
    </div>
  )
}
export default FormLayout