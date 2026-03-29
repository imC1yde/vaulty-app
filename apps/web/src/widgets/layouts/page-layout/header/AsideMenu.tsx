import { navbarData } from '@src/widgets/layouts/page-layout/header/navbar-data.ts'
import NavbarTab from '@src/widgets/layouts/page-layout/header/NavbarTab.tsx'
import Button from '@src/widgets/ui/buttons/Button.tsx'
import { LogInIcon, MenuIcon } from 'lucide-react'
import { type FC, memo } from 'react'

interface IAsideMenuProps {
  readonly close: () => void
  readonly signUpHandler: () => void
}

const AsideMenu: FC<IAsideMenuProps> = memo((props) => {
  return (
    <aside className="fixed inset-0 z-[100] flex justify-end">

      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={() => props.close()}
      />

      <div className="relative w-[280px] h-full border-l bg-secondary-bg/60 border-white/5 p-6 flex flex-col shadow-2xl">

        <div className="mb-4 flex justify-end">
          <Button onClickHandler={props.close}>
            <MenuIcon/>
          </Button>
        </div>

        <nav className="flex flex-col gap-6 mb-12">
          {
            navbarData.map(([ label, link ], i) => (
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