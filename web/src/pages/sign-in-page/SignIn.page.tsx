import { AppRoutes, BaseRoutes } from '@src/common/enums/routes.enum.ts'
import { ToastType } from '@src/common/enums/toast-type.enum.ts'
import { useMutationForm } from '@src/common/hooks/use-mutation-form.hook'
import { AuthRequest } from '@src/core/features/requests/auth.request.ts'
import { useProfileStore } from '@src/core/stores/profile.store.ts'
import { useToastStore } from '@src/core/stores/toast.store'
import { type SignInSchema, signInSchema } from '@src/pages/sign-in-page/sign-in.schema.ts'
import FormLayout from '@src/widgets/layouts/form-layout/FormLayout.tsx'
import ActionButton from '@src/widgets/ui/buttons/action-button/ActionButton'
import Field from '@src/widgets/ui/field/Field.tsx'
import ScreenLoader from '@src/widgets/ui/loaders/ScreenLoader.tsx'
import { type FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignInPage: FC = () => {
  const { login } = useProfileStore()
  const { addToast } = useToastStore()
  const navigate = useNavigate()
  const authForm = useMutationForm<SignInSchema>({
    schema: signInSchema,
    mutation: AuthRequest.AUTHORIZE,
    formOptions: {
      mode: 'onChange',
      reValidateMode: 'onChange',
      defaultValues: {
        email: '',
        password: ''
      }
    },
    mapVariables: (data) => ({
      input: {
        email: data.email,
        password: data.password
      }
    }),
    mutationOptions: {
      onCompleted: (res) => {
        const userData = res.authorizeUser
        if (userData) {
          login({
            id: userData.id,
            email: userData.email,
            username: userData.username
          })
          addToast('Вы успешно авторизовались!', ToastType.INFO)
          navigate(BaseRoutes.HOME)
        }
      },
      onError: (error) => {
        addToast(error.message || 'Ошибка авторизации!', ToastType.ERROR)
      }
    }
  })

  const { register, formState: { errors, isSubmitting } } = authForm.form

  return (
    <FormLayout heading="Вход">
      <ScreenLoader isLoading={isSubmitting}/>

      <form
        onSubmit={authForm.onSubmit}
        className="relative flex flex-col justify-between gap-8 w-full h-full min-h-fit"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Field.Label>Введите email:</Field.Label>
            <div className="relative">
              <Field.Input
                registry={register('email')}
                error={errors.email}
                type="email"
                placeholder="my-email@mail.com"
                className="relative z-10 h-12 w-full bg-primary-bg/60 border border-main-border focus:border-accent/40 transition-all"
              />
            </div>
            <Field.Error error={errors.email}/>
          </div>

          <div className="flex flex-col gap-2">
            <Field.Label>Введите пароль:</Field.Label>
            <div className="relative">
              <Field.Input
                registry={register('password')}
                error={errors.password}
                type="password"
                placeholder="••••••••"
                className="relative z-10 h-12 w-full bg-primary-bg/60 border border-main-border focus:border-accent/40 transition-all"
              />
            </div>
            <Field.Error error={errors.password}/>
          </div>
        </div>

        <div className="flex flex-col gap-6 items-center w-full mt-4">
          <h6 className="flex flex-row justify-center items-center text-primary-text/80 text-[10px] uppercase tracking-[0.2em] opacity-60">
            Впервые?
            <Link
              className="ml-2 text-accent font-bold hover:text-softy hover:brightness-200 transition-all underline-offset-4 hover:underline"
              to={AppRoutes.SIGN_UP}
            >
              Создайте аккаунт
            </Link>
          </h6>

          <div className="w-full">
            <ActionButton.Primary
              type="submit"
              isLoading={isSubmitting}
              className="w-full py-4 text-sm font-bold uppercase tracking-widest"
            >
              Войти
            </ActionButton.Primary>
          </div>
        </div>
      </form>
    </FormLayout>
  )
}

export default SignInPage