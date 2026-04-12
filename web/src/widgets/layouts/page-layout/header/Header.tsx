import { AppRoutes } from '@src/common/enums/routes.enum.ts'
import { useBreakpoint } from '@src/common/hooks/use-mobile.hook.ts'
import { useProfileStore } from '@src/core/stores/profile.store.ts'
import NavbarTab from '@src/widgets/layouts/page-layout/header/components/NavbarTab.tsx'
import { data } from '@src/widgets/layouts/page-layout/header/data.ts'
import AsideMenu from '@src/widgets/layouts/page-layout/menu/AsideMenu.tsx'
import UserMenu from '@src/widgets/layouts/page-layout/menu/UserMenu.tsx'
import Button from '@src/widgets/ui/buttons/Button.tsx'
import Logo from '@src/widgets/ui/logo/Logo.tsx'
import { LogInIcon, MenuIcon } from 'lucide-react'
import { type FC, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

const Header: FC = () => {
  const navigate = useNavigate()
  const { isMobile, isTablet } = useBreakpoint()
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const { isAuthorized, user } = useProfileStore()

  const signUpHandler = () => navigate(AppRoutes.SIGN_IN)
  const menuHandler = () => setIsOpen(prev => !prev)

  return (
    <header
      className="
      fixed top-0 z-50 w-full px-6 py-3.5
      flex items-center justify-between
      bg-primary-bg/80 border-b border-main-border backdrop-blur-xl
      transition-all"
    >
      <div className="flex flex-1 justify-start">
        <Logo/>
      </div>

      <nav className="flex-none flex flex-row gap-8 lg:gap-16 items-center justify-center mx-4">
        {!(isMobile || isTablet) && data.map(([ label, link ], i) => (
          <NavbarTab key={i} link={link}>
            {label}
          </NavbarTab>
        ))}
      </nav>

      <div className="flex-1 flex justify-end items-center gap-4">
        {(isMobile || isTablet) ? (
          <>
            {isAuthorized && isTablet && (
              <div className="flex flex-col items-end mr-2">
                <span className="text-xs font-bold text-white tracking-wide uppercase opacity-80">
                  {user?.username || user?.email}
                </span>
                <span className="text-[9px] text-faded-text/85 font-medium uppercase tracking-[0.2em]">
                  Личный кабинет
                </span>
              </div>
            )}
            <Button onClick={menuHandler} className="p-2">
              <MenuIcon/>
            </Button>
          </>
        ) : (
          isAuthorized ? (
            <>
              <div className="flex flex-col items-end mr-2">
            <span className="text-xs font-bold text-white tracking-wide uppercase opacity-80">
              {user?.username || user?.email}
            </span>
                <span className="text-[9px] text-faded-text/85 font-medium uppercase tracking-[0.2em]">
              Личный кабинет
            </span>
              </div>
              <UserMenu/>
            </>
          ) : (
            <Button onClick={signUpHandler}>
              <span className="text-sm font-medium tracking-wide">Войти</span>
              <LogInIcon size={18}/>
            </Button>
          )
        )}
      </div>

      {(isMobile || isTablet) && isOpen && createPortal(
        <AsideMenu close={() => setIsOpen(false)} signUpHandler={signUpHandler}/>,
        document.body
      )}
    </header>
  )
}

export default Header