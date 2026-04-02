import Logo from '@src/widgets/ui/logo/Logo.tsx'
import { type FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="w-full pb-16 pt-12 px-4 flex flex-col items-center border-t border-white/5 bg-primary-bg/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl flex flex-col gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start px-4">

          <div className="flex flex-col items-center sm:items-start gap-1.5">
            <span className="text-[9px] uppercase tracking-[0.2em] text-muted-text/40 font-bold">Провайдер данных</span>
            <a
              href="https://rawg.io/"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-faded-text/60 hover:text-accent transition-colors italic"
            >
              RAWG.io Database
            </a>
          </div>

          <div className="flex flex-col items-center gap-3">
            <p className="text-[10px] leading-relaxed text-faded-text/50 text-center italic max-w-[280px]">
              Проект разработан в целях обучения и демонстрации навыков разработки.
              Контент носит ознакомительный характер.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1.5">
            <span className="text-[9px] uppercase tracking-[0.2em] text-muted-text/40 font-bold">Системный статус</span>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"/>
              <span className="text-[11px] font-mono text-faded-text/60">v1.0.0-stable</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4 opacity-40 grayscale hover:opacity-70 transition-all duration-1000">
          <div className="scale-50 origin-center">
            <Logo/>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer