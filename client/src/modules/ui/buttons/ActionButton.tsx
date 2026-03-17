import type { INestable } from '@src/common/interfaces/nestable.interface.ts'
import { motion } from 'framer-motion'
import { type FC } from 'react'

interface IActionButtonProps extends INestable {
  readonly onClickHandler: (...args: any[]) => void
}

const ActionButton: FC<IActionButtonProps> = (props) => {
  return (
    <motion.button
      onClick={props.onClickHandler}
      className="cursor-pointer flex flex-row items-center justify-center bg-main-glow p-2.5 rounded-sm transition-colors overflow-hidden h-12 w-[13rem]"
      initial={{
        outline: "0px solid #0B4C8A00",
        boxShadow: "0px 0px 0px rgba(11, 76, 138, 0)"
      }}
      whileHover={{
        outline: "2px solid #0B4C8AB1",
        boxShadow: "0px 0px 15px 2px rgba(11, 76, 138, 0.4)"
      }}
      whileTap={{
        outline: "2px solid #0B4C8AB1",
        outlineOffset: "2px",
        scale: 0.95
      }}
      transition={{
        type: 'tween',
        duration: 0.2,
        ease: "easeOut"
      }}
    >
      {props.children}
    </motion.button>
  )
}

export default ActionButton