import { BASE_ROUTES } from '@src/common/constants/routes.constant.ts'
import { useMobile } from '@src/common/hooks/use-mobile.hook.ts'
import AsideMenu from '@src/modules/layouts/header/AsideMenu.tsx'
import { navbarTabs } from '@src/modules/layouts/header/navbar-tabs.ts'
import NavbarTab from '@src/modules/layouts/header/NavbarTab.tsx'
import Button from '@src/modules/ui/buttons/Button.tsx'
import Logo from '@src/modules/ui/logo/Logo.tsx'
import { LogInIcon, MenuIcon } from 'lucide-react'
import { createContext, type FC, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

export const NavbarContext = createContext(navbarTabs[0][0])

const Header: FC = () => {
  const navigate = useNavigate()
  const isMobile = useMobile()
  const [ isOpen, setIsOpen ] = useState<boolean>(false)

  const signUpHandler = () => navigate(BASE_ROUTES.AUTH)

  const menuHandler = () => setIsOpen(prev => !prev)

  return (
    <header
      className={`
        w-full h-[5rem] flex flex-row justify-between items-center align-center backdrop-blur-lg px-3
      `}>
      <div className="w-12 h-12">
        <Logo size="2rem"/>
      </div>

      {
        isMobile ?
          <>
            <Button onClickHandler={menuHandler}>
              <MenuIcon/>
            </Button>

            {isOpen && createPortal(
              <AsideMenu close={() => setIsOpen(false)} signUpHandler={signUpHandler}/>,
              document.body
            )}
          </>
          :
          <>
            <nav className="flex flex-row gap-[14vh]">
              {
                navbarTabs.map(([ label, link ], i) => (
                  <button key={i} onClick={() => null}>
                    <NavbarTab label={label} link={link}/>
                  </button>
                ))
              }
            </nav>

            <Button onClickHandler={signUpHandler}>
              <span className="mr-2">Войти</span>
              <LogInIcon/>
            </Button>
          </>
      }

    </header>
  )
}

export default Header