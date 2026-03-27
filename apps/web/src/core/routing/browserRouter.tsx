import { APP_ROUTES, BASE_ROUTES } from '@src/common/constants/routes.constant.ts'
import AuthProxy from '@src/modules/proxy/AuthProxy.tsx'
import CustomInventoryPage from '@src/pages/custom-inventory-page/CustomInventory.page.tsx'
import GameInventoryPage from '@src/pages/game-inventory-page/GameInventory.page.tsx'
import HomePage from '@src/pages/home-page/Home.page.tsx'
import SignInPage from '@src/pages/sign-in-page/SignIn.page.tsx'
import SignUpPage from '@src/pages/sign-up-page/SignUp.page.tsx'
import { createBrowserRouter, Navigate } from 'react-router-dom'

export const routerSetup = [
  {
    path: BASE_ROUTES.HOME,
    element: <HomePage/>,
    requiresAuth: false
  },
  {
    path: APP_ROUTES.SIGN_UP,
    element: <SignUpPage/>,
    requiresAuth: false
  },
  {
    path: APP_ROUTES.SIGN_IN,
    element: <SignInPage/>,
    requiresAuth: false
  },
  {
    path: APP_ROUTES.CUSTOM,
    element: <CustomInventoryPage/>,
    requiresAuth: true
  },
  {
    path: APP_ROUTES.GAMES,
    element: <GameInventoryPage/>,
    requiresAuth: true
  },
  {
    path: '*',
    element: <Navigate to={BASE_ROUTES.HOME} replace/>
  }
]

export const browserRouter = createBrowserRouter(
  routerSetup.map(setup => ({
    path: setup.path,
    element: setup.requiresAuth ? <AuthProxy>{setup.element}</AuthProxy> : setup.element
  }))
)
