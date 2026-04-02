import { browserRouter } from '@src/core/routing/browserRouter.tsx'
import { RouterProvider } from 'react-router-dom'

const AppRouter = () => {
  return <RouterProvider router={browserRouter}/>
}

export default AppRouter