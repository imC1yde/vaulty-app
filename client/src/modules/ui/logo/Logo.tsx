import logo from '@src/assets/logo.svg'
import { type FC } from 'react'

interface ILogoProps {
  readonly size: string
}

const Logo: FC<ILogoProps> = (props) => {
  return (
    <img src={logo} className={`w-[${props.size}] h-[${props.size}] object-contain`}/>
  )
}

export default Logo