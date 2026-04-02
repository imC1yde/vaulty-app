import { AppRoutes } from '@src/common/enums/routes.enum.ts'
import { useMobile } from '@src/common/hooks/use-mobile.hook.ts'
import AsideMenu from '@src/widgets/layouts/page-layout/header/components/AsideMenu.tsx'
import NavbarTab from '@src/widgets/layouts/page-layout/header/components/NavbarTab.tsx'
import { data } from '@src/widgets/layouts/page-layout/header/data.ts'
import Button from '@src/widgets/ui/buttons/Button.tsx'
import Logo from '@src/widgets/ui/logo/Logo.tsx'
import { LogInIcon, MenuIcon } from 'lucide-react'
import { type FC, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

const Header: FC = () => {
  const navigate = useNavigate()
  const isMobile = useMobile()
  const [ isOpen, setIsOpen ] = useState<boolean>(false)

  const signUpHandler = () => navigate(AppRoutes.SIGN_IN)

  const menuHandler = () => setIsOpen(prev => !prev)

  return (
    <header
      className="
      fixed top-0 z-50 w-full h-auto py-3.5 px-8
      flex flex-row justify-between items-center
      bg-primary-bg/80 border-b border-main-border backdrop-blur-xl
      transition-all"
    >
      <Logo/>

      {
        isMobile ?
          <>
            <Button onClick={menuHandler} className="p-2">
              <MenuIcon/>
            </Button>

            {isOpen && createPortal(
              <AsideMenu close={() => setIsOpen(false)} signUpHandler={signUpHandler}/>,
              document.body
            )}
          </>
          :
          <>
            <nav className="flex flex-row gap-12 lg:gap-40 items-center justify-center">
              {data.map(([ label, link ], i) => (
                <NavbarTab key={i} link={link}>
                  {label}
                </NavbarTab>
              ))}
            </nav>

            <div className="flex flex-row items-center gap-4">
              <Button
                onClick={signUpHandler}
              >
                <span className="text-sm font-medium tracking-wide">Войти</span>
                <LogInIcon size={18}/>
              </Button>
            </div>
          </>
      }
    </header>
  )
}

export default Header