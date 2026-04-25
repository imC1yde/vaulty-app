import { AppRoutes, BaseRoutes } from '@src/common/enums/routes.enum.ts'
import CustomInventoryPage from '@src/pages/custom-inventory-page/CustomInventoryPage.tsx'
import GameInventoryPage from '@src/pages/game-inventory-page/GameInventoryPage.tsx'
import HomePage from '@src/pages/home-page/HomePage.tsx'
import SignInPage from '@src/pages/sign-in-page/SignInPage.tsx'
import SignUpPage from '@src/pages/sign-up-page/SignUpPage.tsx'
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
