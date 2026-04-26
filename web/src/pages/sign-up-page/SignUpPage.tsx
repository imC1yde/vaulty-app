import { AppRoutes } from '@src/common/enums/routes.enum.ts'
import { ToastType } from '@src/common/enums/toast-type.enum.ts'
import { useMutationForm } from '@src/common/hooks/use-mutation-form.hook.ts'
import { AuthRequest } from '@src/core/features/requests/auth.request.ts'
import { useToastStore } from '@src/core/stores/toast.store.ts'
import { type SignUpSchema, signUpSchema } from '@src/pages/sign-up-page/sign-up.schema.ts'
import FormLayout from '@src/widgets/layouts/form-layout/FormLayout.tsx'
import ActionButton from '@src/widgets/ui/buttons/action-button/ActionButton.tsx'
import Field from '@src/widgets/ui/field/Field.tsx'
import ScreenLoader from '@src/widgets/ui/loaders/ScreenLoader.tsx'
import { type FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUpPage: FC = () => {
  const { addToast } = useToastStore()
  const navigate = useNavigate()
  const registerForm = useMutationForm<SignUpSchema>({
    schema: signUpSchema,
    mutation: AuthRequest.REGISTER,
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
        const userData = res.registerUser
        if (!userData) {
          addToast('Регистрация не удалась!', ToastType.ERROR)
          return
        }
        addToast('Вы успешно зарегистрировались!', ToastType.INFO)
        navigate(AppRoutes.SIGN_IN)
      },
      onError: (error) => {
        addToast(error.message || 'Ошибка регистрации!', ToastType.ERROR)
      }
    }
  })

  const { register, formState: { errors, isSubmitting } } = registerForm.form

  return (
    <FormLayout heading="Регистрация">
      <ScreenLoader isLoading={isSubmitting}/>

      <form
        onSubmit={registerForm.onSubmit}
        className="relative flex flex-col justify-between gap-8 w-full h-full min-h-fit"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Field.Label>Введите свой email:</Field.Label>
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
            <Field.Label>Придумайте пароль:</Field.Label>
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

          <div className="flex flex-col gap-2">
            <Field.Label>Повторите пароль:</Field.Label>
            <div className="relative">
              <Field.Input
                registry={register('confirmPassword')}
                error={errors.confirmPassword}
                type="password"
                placeholder="••••••••"
                className="relative z-10 h-12 w-full bg-primary-bg/60 border border-main-border focus:border-accent/40 transition-all"
              />
            </div>
            <Field.Error error={errors.confirmPassword}/>
          </div>
        </div>

        <div className="flex flex-col gap-6 items-center w-full mt-4">
          <h6 className="flex flex-row justify-center items-center text-primary-text/80 text-[6.5px] md:text-[10px] uppercase tracking-[0.2em] opacity-60">
            Уже имеется аккаунт?
            <Link
              className="ml-2 text-accent text-[6.5px] md:text-[10px] font-bold hover:text-softy hover:brightness-200 transition-all underline-offset-4 hover:underline"
              to={AppRoutes.SIGN_IN}
            >
              Войдите сейчас
            </Link>
          </h6>

          <div className="w-full">
            <ActionButton.Primary
              type="submit"
              isLoading={isSubmitting}
              className="w-full py-4 text-sm font-bold uppercase tracking-widest"
            >
              Создать
            </ActionButton.Primary>
          </div>
        </div>
      </form>
    </FormLayout>
  )
}

export default SignUpPage
