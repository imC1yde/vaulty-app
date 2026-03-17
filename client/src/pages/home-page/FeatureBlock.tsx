import type { Feature } from '@src/pages/home-page/shared/types/feature.type.ts'
import { motion } from 'framer-motion'
import { type FC } from 'react'

interface IFeatureBlockProps {
  readonly feature: Feature
  readonly index: number
}

const FeatureBlock: FC<IFeatureBlockProps> = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: props.index * 0.1 }}
      className={`flex flex-col md:items-center gap-12 md:gap-24 ${
        props.index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <div className="w-full md:w-1/2">
        <div className={`aspect-video rounded-3xl border border-white/5 overflow-hidden shadow-2xl flex items-center justify-center`}>
              <span className="text-slate-500 font-mono text-sm uppercase tracking-tighter">
                {props.feature.img}
              </span>
        </div>
      </div>

      <div className="w-full md:w-1/2 space-y-6">
        <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight overflow-hidden">
          {props.feature.title}
        </h3>
        <p className="text-late-400 text-lg font-light leading-relaxed">
          {props.feature.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default FeatureBlock