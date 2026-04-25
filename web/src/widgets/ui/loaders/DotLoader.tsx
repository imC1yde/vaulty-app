import { motion } from 'framer-motion'
import type { FC } from 'react'

const DotLoader: FC = () => {
  return (
    <div className="flex items-center gap-1 h-3">
      {[ 0, 1, 2 ].map((i) => (
        <motion.div
          key={i}
          variants={{
            initial: { y: 0 },
            animate: { y: -3 }
          }}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse" as const,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
          className="w-1 h-1 bg-muted-text rounded-[2px]"
        />
      ))}
    </div>
  )
}

export default DotLoader