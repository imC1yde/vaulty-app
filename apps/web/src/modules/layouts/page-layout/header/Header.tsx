import { APP_ROUTES } from '@src/common/constants/routes.constant.ts'
import { useMobile } from '@src/common/hooks/use-mobile.hook.ts'
import AsideMenu from '@src/modules/layouts/page-layout/header/AsideMenu.tsx'
import { navbarData } from '@src/modules/layouts/page-layout/header/navbar-data.ts'
import NavbarTab from '@src/modules/layouts/page-layout/header/NavbarTab.tsx'
import Button from '@src/modules/ui/buttons/Button.tsx'
import Logo from '@src/modules/ui/logo/Logo.tsx'
import { LogInIcon, MenuIcon } from 'lucide-react'
import { type FC, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

const Header: FC = () => {
  const navigate = useNavigate()
  const isMobile = useMobile()
  const [ isOpen, setIsOpen ] = useState<boolean>(false)

  const signUpHandler = () => navigate(APP_ROUTES.SIGN_IN)

  const menuHandler = () => setIsOpen(prev => !prev)

  return (
    <header
      className={`
        w-full h-[5rem] flex flex-row justify-between items-center align-center backdrop-blur-lg px-3
      `}>
      <div className="w-12 h-12 overflow-y-hidden">
        <Logo/>
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
                navbarData.map(([ label, link ], i) => (
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