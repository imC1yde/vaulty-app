import type { FC } from 'react'

const SpinnerLoader: FC = () => {
  return (
    <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"/>
  )
}

export default SpinnerLoader