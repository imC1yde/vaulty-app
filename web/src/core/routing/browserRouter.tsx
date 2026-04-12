import { AppRoutes, BaseRoutes } from '@src/common/enums/routes.enum.ts'
import CustomInventoryPage from '@src/pages/custom-inventory-page/CustomInventory.page.tsx'
import GameInventoryPage from '@src/pages/game-inventory-page/GameInventory.page.tsx'
import HomePage from '@src/pages/home-page/Home.page.tsx'
import SignInPage from '@src/pages/sign-in-page/SignIn.page.tsx'
import SignUpPage from '@src/pages/sign-up-page/SignUp.page.tsx'
import AuthProxy from '@src/widgets/proxy/AuthProxy.tsx'
import { createBrowserRouter, Navigate } from 'react-router-dom'

export const routerSetup = [
  {
    path: BaseRoutes.HOME,
    element: <HomePage/>,
    requiresAuth: false
  },
  {
    path: AppRoutes.SIGN_UP,
    element: <SignUpPage/>,
    requiresAuth: false
  },
  {
    path: AppRoutes.SIGN_IN,
    element: <SignInPage/>,
    requiresAuth: false
  },
  {
    path: AppRoutes.CUSTOM,
    element: <CustomInventoryPage/>,
    requiresAuth: true
  },
  {
    path: AppRoutes.GAMES,
    element: <GameInventoryPage/>,
    requiresAuth: true
  },
  {
    path: '*',
    element: <Navigate to={BaseRoutes.HOME} replace/>
  }
]

export const browserRouter = createBrowserRouter(
  routerSetup.map(setup => ({
    path: setup.path,
    element: setup.requiresAuth ? <AuthProxy>{setup.element}</AuthProxy> : setup.element
  }))
)
