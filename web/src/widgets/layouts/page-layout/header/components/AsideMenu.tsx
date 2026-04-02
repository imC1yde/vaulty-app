import NavbarTab from '@src/widgets/layouts/page-layout/header/components/NavbarTab.tsx'
import { data } from '@src/widgets/layouts/page-layout/header/data.ts'
import Button from '@src/widgets/ui/buttons/Button.tsx'
import { motion } from 'framer-motion'
import { LogInIcon, MenuIcon } from 'lucide-react'
import { type FC, memo } from 'react'

interface IAsideMenuProps {
  readonly close: () => void
  readonly signUpHandler: () => void
}

const AsideMenu: FC<IAsideMenuProps> = memo((props) => {
  return (
    <aside className="fixed inset-0 z-[100] flex justify-end">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 backdrop-blur-md bg-black/20"
        onClick={() => props.close()}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-[300px] h-full border-l border-main-border bg-secondary-bg/80 backdrop-blur-2xl p-6 flex flex-col shadow-2xl"
      >
        <div className="mb-8 flex flex-row justify-between items-center w-full overflow-hidden">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-text font-semibold min-w-0 truncate">
            Навигация
          </span>
          <Button
            onClick={props.close}
            className="p-2 flex items-center justify-center flex-shrink-0 transition-transform active:scale-90"
          >
            <MenuIcon/>
          </Button>
        </div>

        <nav className="flex flex-col gap-4 mb-auto">
          {data.map(([ label, link ], i) => (
            <NavbarTab key={i} link={link}>
              {label}
            </NavbarTab>
          ))}
        </nav>

        <div className="pt-6 border-t border-main-border/50">
          <Button
            onClick={props.signUpHandler}
            className="w-full py-4 flex flex-row items-center justify-center gap-3 bg-accent/10 border border-accent/20 hover:bg-accent/20 rounded-xl transition-all"
          >
            <span className="font-medium">Войти</span>
            <LogInIcon size={18}/>
          </Button>
        </div>
      </motion.div>
    </aside>
  )
})

export default AsideMenu