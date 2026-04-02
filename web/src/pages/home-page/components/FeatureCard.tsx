import type { Feature } from '@src/pages/home-page/data.ts'
import { motion } from 'framer-motion'
import type { FC } from 'react'

interface IFeatureCardProps {
  feature: Feature
  index: number
}

const FeatureCard: FC<IFeatureCardProps> = (props) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: props.index * 0.1 }}
    className={`flex flex-col md:items-center gap-8 md:gap-16 ${
      props.index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
    }`}
  >
    <div className="w-full md:w-1/2">
      <div className="aspect-video relative overflow-hidden rounded-2xl border border-main-border bg-accent-bg/10 flex items-center justify-center group">

        {props.feature.image ? (
          <img
            src={props.feature.image}
            alt={props.feature.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-50"/>
            <div className="relative overflow-hidden w-28 h-36 border-2 border-accent/20 rounded-lg backdrop-blur-md flex flex-col p-2 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
              <div className="w-full h-1/2 bg-accent/10 rounded-sm mb-2 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-tr from-accent/20 to-transparent"/>
              </div>
              <div className="w-full h-1.5 bg-accent/20 rounded mb-1"/>
              <div className="w-2/3 h-1.5 bg-accent/10 rounded"/>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent/20 rounded-full blur-xl"/>
            </div>
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"/>
      </div>
    </div>

    <div className="w-full md:w-1/2 space-y-4">
      <h3 className="text-2xl md:text-3xl font-bold text-primary-text tracking-tight">
        {props.feature.title}
      </h3>
      <p className="text-secondary-text text-lg font-light leading-relaxed max-w-lg">
        {props.feature.desc}
      </p>
    </div>
  </motion.div>
)

export default FeatureCard