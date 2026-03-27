import { APP_ROUTES } from '@src/common/constants/routes.constant.ts'
import type { INestable } from '@src/common/interfaces/nestable.interface.ts'
import { useProfileStore } from '@src/core/stores/profile.store.ts'
import { type FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface IAuthProxyProps extends INestable {}

const AuthProxy: FC<IAuthProxyProps> = (props) => {
  const token = useProfileStore(store => store.token)
  const location = useLocation()

  if (!token)
    return <Navigate to={APP_ROUTES.SIGN_IN} state={{ from: location }} replace/>

  return (
    <>{props.children}</>
  )
}

export default AuthProxy