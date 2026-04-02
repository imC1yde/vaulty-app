import { BaseRoute } from '@src/common/enums/routes.enum.ts'
import type { INestable } from '@src/common/interfaces/nestable.interface.ts'
import { MoveLeft } from 'lucide-react'
import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface IFormLayoutProps extends INestable {
  readonly heading: string
}

const FormLayout: FC<IFormLayoutProps> = (props) => {
  const navigate = useNavigate()

  const buttonHandler = () => navigate(BaseRoute.HOME)

  return (
    <div
      className="bg-fixed h-dvh w-dvw flex flex-col justify-center items-center"
      style={{
        background: `
            linear-gradient(
              165deg,
              var(--color-gradient-start) 0%,
              var(--color-gradient-mid) 44%,
              var(--color-gradient-end) 100%
            )
          `
      }}
    >
      <button
        onClick={buttonHandler}
        className="flex flex-row gap-3 absolute top-6 left-6 p-3 rounded-full hover:bg-white/10 transition-colors text-white/65 hover:text-white">
        <MoveLeft/>
        На главную
      </button>
      <h1 className="mb-7 text-3xl md:text-5xl font-extrabold tracking-tight text-white/65 leading-[1.2]">{props.heading}</h1>

      <div className="w-[92%] sm:w-[80%] md:w-full md:max-w-[480px] min-h-[400px] bg-primary-bg ring-1 ring-main-glow/30 rounded-[2.5rem] shadow-2xl flex flex-col p-10 md:p-13">
        <div className="my-auto w-full flex flex-col gap-8 items-center">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default FormLayout