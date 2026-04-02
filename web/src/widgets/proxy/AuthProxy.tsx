import { AppRoutes } from '@src/common/enums/routes.enum.ts'
import type { INestable } from '@src/common/interfaces/nestable.interface.ts'
import { useProfileStore } from '@src/core/stores/profile.store.ts'
import { type FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface IAuthProxyProps extends INestable {}

const AuthProxy: FC<IAuthProxyProps> = (props) => {
  const { isAuthorized } = useProfileStore()
  const location = useLocation()

  if (!isAuthorized) return <Navigate to={AppRoutes.SIGN_IN} state={{ from: location }} replace/>

  return (
    <>{props.children}</>
  )
}

export default AuthProxy