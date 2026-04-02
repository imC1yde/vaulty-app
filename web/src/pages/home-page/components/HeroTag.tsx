import type { INestable } from '@src/common/interfaces/nestable.interface.ts'
import type { FC } from 'react'

interface IHeroTagProps extends INestable {
  isPulse?: boolean
}

const HeroTag: FC<IHeroTagProps> = (props) => (
  <span className={`flex items-center gap-2 ${props.isPulse ? 'text-accent/80' : ''}`}>
    <div className={`w-1 h-1 rounded-full bg-accent ${props.isPulse ? 'animate-pulse' : ''}`}/>
    {props.children}
  </span>
)

export default HeroTag