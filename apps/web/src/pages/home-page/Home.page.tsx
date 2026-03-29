import { AppRoutes } from '@src/common/enums/routes.enum.ts'
import FeatureBlock from '@src/pages/home-page/FeatureBlock.tsx'
import { featuresData } from '@src/pages/home-page/features-data.ts'
import Layout from '@src/widgets/layouts/page-layout/Layout.tsx'
import ActionButton from '@src/widgets/ui/buttons/ActionButton.tsx'
import { motion } from 'framer-motion'
import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage: FC = () => {
  const navigate = useNavigate()

  const actionButtonHandler = () => navigate(AppRoutes.CUSTOM)

  return (
    <Layout>
      <div className="flex flex-col gap-20 py-10">

        <section className="text-center max-w-4xl mx-auto px-4 overflow-hidden mb-2">
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

        <section className="w-full max-w-6xl mx-auto px-6 py-25 space-y-10 md:space-y-20 divide-indigo-500/40 divide-y-1 sm:divide-none">
          {featuresData.map((feature, i) => (
            <div key={i} className="py-10 md:py-2 first:pt-0 last:pb-0">
              <FeatureBlock feature={feature} index={i}/>
            </div>
          ))}
        </section>

        <section className="bg-slate-900/50 border-y border-white/5 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Готов начать свою коллекцию?
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center py-2 gap-4">
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