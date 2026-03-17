import { navbarTabs } from '@src/modules/layouts/header/navbar-tabs.ts'
import NavbarTab from '@src/modules/layouts/header/NavbarTab.tsx'
import Button from '@src/modules/ui/buttons/Button.tsx'
import { LogInIcon } from 'lucide-react'
import { type FC, memo } from 'react'

interface IAsideMenuProps {
  readonly close: () => void
  readonly signUpHandler: () => void
}

const AsideMenu: FC<IAsideMenuProps> = memo((props) => {
  return (
    <aside className="fixed inset-0 z-[100] flex justify-end">

      <div
        className="absolute inset-0 bg-secondary-bg/60 backdrop-blur-sm"
        onClick={() => props.close()}
      />

      <div className="relative w-[280px] h-full bg-slate-900 border-l border-white/5 p-6 flex flex-col shadow-2xl">

        <button
          onClick={() => props.close()}
          className="self-end p-2 text-slate-400 mb-8"
        >
          Закрыть
        </button>

        <nav className="flex flex-col gap-6 mb-12">
          {
            navbarTabs.map(([ label, link ], i) => (
              <NavbarTab key={i} label={label} link={link}/>
            ))
          }
        </nav>

        <Button onClickHandler={props.signUpHandler}>
          <span className="mr-2">Войти</span>
          <LogInIcon/>
        </Button>

      </div>
    </aside>
  )
})

export default AsideMenu