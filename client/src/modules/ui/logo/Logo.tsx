import logo from '@src/assets/logo.svg'
import { type FC } from 'react'

const Logo: FC = () => {
  return (
    <img src={logo} alt="logo" className="object-contain scale-200"/>
  )
}

export default Logo