import { useMutation } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppRoutes } from '@src/common/enums/routes.enum.ts'
import { ToastType } from '@src/common/enums/toast-type.enum.ts'
import type { IUser } from '@src/common/interfaces/user.interface.ts'
import { AuthRequest } from '@src/core/features/requests/auth.request.ts'
import { useProfileStore } from '@src/core/stores/profile.store.ts'
import { useToastStore } from '@src/core/stores/toast.store.ts'
import { type SignInSchema, signInSchema } from '@src/pages/sign-in-page/sign-in.schema.ts'
import FormLayout from '@src/widgets/layouts/form-layout/FormLayout.tsx'
import Button from '@src/widgets/ui/buttons/Button.tsx'
import Field from '@src/widgets/ui/fields/Field.tsx'
import ScreenLoader from '@src/widgets/ui/loaders/ScreenLoader.tsx'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

interface IAuthorizeUserResponse {
  authorizeUser: IUser
}

const SignInPage: FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onChange'
  })
  const { addToast } = useToastStore()
  const { login } = useProfileStore()
  const [ authorizeUser ] = useMutation<IAuthorizeUserResponse>(
    AuthRequest.AUTHORIZE,
    {
      onCompleted: (_) => addToast('Вы успешно вошли в систему!', ToastType.INFO),
      onError: (error) => addToast(error.message || 'Ошибка авторизации!', ToastType.ERROR)
    }
  )

  const submitHandler = async (data: SignInSchema) => {
    try {
      const result = await authorizeUser({
        variables: {
          input: {
            email: data.email,
            password: data.password
          }
        }
      })

      const userData = result.data?.authorizeUser
      if (!userData) {
        addToast('Ответ пришел пустым', ToastType.ERROR)
        return
      }

      login({
        id: userData.id,
        email: userData.email,
        username: userData.username
      })

      reset()
    } catch (error) {}
  }

  return (
    <FormLayout heading="Вход">
      <ScreenLoader isLoading={isSubmitting}/>

      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-10 group w-full">
        <div className="flex flex-col gap-5">
          <Field
            label="Введите email:"
            placeholder="my-email@mail.com"
            type="email"
            errors={errors}
            registry={register('email')}
            target="email"/>
          <Field
            label="Введите пароль:"
            placeholder="••••••••"
            type="password"
            errors={errors}
            registry={register('password')}
            target="password"/>
        </div>

        <div className="flex flex-col gap-6 items-center w-full">
          <h6 className="flex flex-row justify-center text-slate-500 text-xs">
            Впервые?
            <Link className="px-1 text-secondary-text/90 font-bold hover:text-white transition-colors" to={AppRoutes.SIGN_UP}>
              Создайте аккаунт
            </Link>
          </h6>

          <div className="w-full px-6 py-2">
            <Button className="w-full">
              {isSubmitting ? "Вход" : "Войти"}
            </Button>
          </div>
        </div>
      </form>
    </FormLayout>
  )
}

export default SignInPage