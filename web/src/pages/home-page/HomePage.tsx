import { AppRoutes } from '@src/common/enums/routes.enum.ts'
import BentoCard from '@src/pages/home-page/components/BentoCard.tsx'
import FeatureCard from '@src/pages/home-page/components/FeatureCard.tsx'
import HeroTag from '@src/pages/home-page/components/HeroTag.tsx'
import { bentoItems, features, heroTags } from '@src/pages/home-page/data.ts'
import Layout from '@src/widgets/layouts/page-layout/Layout.tsx'
import ActionButton from '@src/widgets/ui/buttons/action-button/ActionButton.tsx'
import { motion } from 'framer-motion'
import { type FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage: FC = memo(() => {
  const navigate = useNavigate()

  const actionButtonHandler = () => navigate(AppRoutes.CUSTOM)

  return (
    <Layout>
      <main className="flex flex-col gap-12 py-6 bg-primary-bg min-h-screen">

        <section className="text-center max-w-5xl mx-auto px-4 mb-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary-text mb-6 leading-[1.1] pb-2"
          >
            Твои вещи. <br/> Твои игры. <br/> В одном <span className="text-accent">архиве</span>
          </motion.h1>
          <motion.p className="text-secondary-text text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto">
            Vaulty — это простое и защищенное место для твоих коллекций.
          </motion.p>
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-[10px] uppercase tracking-[0.2em] text-muted-text font-medium">
            {heroTags.map((tag, i) => (
              <HeroTag key={i} isPulse={tag.type === 'pulse'}>
                {tag.label}
              </HeroTag>
            ))}
          </div>
        </section>

        <section className="overflow-y-hidden w-full max-w-6xl mx-auto px-6 py-6 space-y-12 md:space-y-16 min-h-0">
          {features.map((feature, i) =>
            <FeatureCard key={i} index={i} feature={feature}/>
          )}
        </section>

        <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {bentoItems.map((item, i) =>
            <BentoCard key={i} item={item}/>
          )}
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center pb-2">
            <h2 className="text-3xl md:text-4xl font-semibold text-primary-text mb-8 tracking-wide overflow-y-hidden">
              Начни свою коллекцию сегодня
            </h2>
            <ActionButton.Neon
              onClick={actionButtonHandler}
              className="py-3 px-9 text-sm tracking-[0.2em] min-w-[200px]"
            >
              <span className="text-lg">Создать</span>
            </ActionButton.Neon>
          </div>
        </section>

      </main>
    </Layout>
  )
})

export default HomePage