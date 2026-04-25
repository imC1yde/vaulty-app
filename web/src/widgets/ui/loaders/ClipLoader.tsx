import { type FC } from 'react'
import { ClipLoader as ClipSpinner } from 'react-spinners'

interface IClipLoaderProps {
  readonly size?: number
  readonly color?: string
}

const ClipLoader: FC<IClipLoaderProps> = (props) => {
  return (
    <ClipSpinner {...props} />
  )
}

export default ClipLoader