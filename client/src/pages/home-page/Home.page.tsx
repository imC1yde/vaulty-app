import { APP_ROUTES } from '@src/common/constants/routes.constant.ts'
import Layout from '@src/modules/layouts/Layout.tsx'
import ActionButton from '@src/modules/ui/buttons/ActionButton.tsx'
import FeatureBlock from '@src/pages/home-page/FeatureBlock.tsx'
import type { Feature } from '@src/pages/home-page/shared/types/feature.type.ts'
import { motion } from 'framer-motion'
import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'

const features: Feature[] = [
  {
    title: "Создай собственную коллекцию",
    desc: "Создай свой собственный беклог из всего, что взбредет в голову.",
    img: "Social Links"
  },
  {
    title: "Интеграция с RAWG",
    desc: "Получай актуальные данные о миллионах игр, включая оценки критиков, даты релизов и другую полезную информацию.",
    img: "RAWG Showcase"
  },
  {
    title: "Умные фильтры",
    desc: "Распределяй свой бэклог по жанрам, платформам или оценке. Твой инвентарь всегда под контролем.",
    img: "Sort Preview"
  }
]

const HomePage: FC = () => {
  const navigate = useNavigate()

  const actionButtonHandler = () => navigate(APP_ROUTES.CUSTOM)

  return (
    <Layout>
      <div className="flex flex-col gap-20 py-10">

        <section className="text-center max-w-4xl mx-auto px-4 h-[16rem] overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.2]"
          >
            <span className="text-indigo-500">Vaulty</span> - твой
            цифровой <span className="text-indigo-500">архив</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl font-light leading-relaxed"
          >
            Собирай свои коллекции из чего угодно, создавай уникальный инвентарь своего геймерского пути с помощью RAWG
            API.
          </motion.p>
        </section>

        <section className="w-full max-w-6xl mx-auto px-6 py-25 space-y-24 md:space-y-40 divide-indigo-500/40 divide-y-1 sm:divide-none">
          {features.map((feature, i) => (
            <div key={i} className="py-12 md:py-20 first:pt-0 last:pb-0">
              <FeatureBlock feature={feature} index={i}/>
            </div>
          ))}
        </section>

        <section className="bg-slate-900/50 border-y border-white/5 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Готов начать свою коллекцию?
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <ActionButton onClickHandler={actionButtonHandler}>
                Создать коллекцию
              </ActionButton>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  )
}

export default HomePage