import { BASE_ROUTES } from '@src/common/constants/routes.constant.ts'
import AuthPage from '@src/pages/Auth.page.tsx'
import HomePage from '@src/pages/home-page/Home.page.tsx'
import { createBrowserRouter, Navigate } from 'react-router-dom'

export const routerSetup = [
  {
    path: BASE_ROUTES.HOME,
    element: <HomePage/>,
    requiresAuth: false
  },
  {
    path: BASE_ROUTES.AUTH,
    element: <AuthPage/>,
    requiresAuth: false
  },
  // {
  //   path: '/inventories',
  //   element: <CustomInventoryPage/>,
  //   requiresAuth: true
  // },
  {
    path: '*',
    element: <Navigate to={BASE_ROUTES.HOME} replace/>
  }
]

export const browserRouter = createBrowserRouter(
  routerSetup.map(setup => ({
    path: setup.path,
    element: setup.element
  }))
)
