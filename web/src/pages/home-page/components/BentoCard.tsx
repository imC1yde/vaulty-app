import type { BentoItem } from '@src/pages/home-page/data.ts'
import type { FC } from 'react'

interface IBentoCardProps {
  readonly item: BentoItem
}

const BentoCard: FC<IBentoCardProps> = (props) => (
  <div className="p-6 bg-secondary-bg border border-main-border rounded-2xl hover:border-accent/40 transition-colors group">
    <h4 className="text-accent font-bold mb-2 text-lg tracking-wide group-hover:translate-x-1 transition-transform">{props.item.title}</h4>
    <p className="text-secondary-text text-sm leading-relaxed">{props.item.desc}</p>
  </div>
)

export default BentoCard