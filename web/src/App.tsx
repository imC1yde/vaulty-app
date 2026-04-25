import AppRouter from '@src/core/routing/AppRouter.tsx'
import Toast from '@src/widgets/ui/notifications/Toast.tsx'

const App = () => {
  return (
    <>
      <Toast/>
      <AppRouter/>
    </>
  )
}

export default App
