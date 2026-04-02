import { useMutation } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppRoutes } from '@src/common/enums/routes.enum.ts'
import { ToastType } from '@src/common/enums/toast-type.enum.ts'
import { AuthRequest } from '@src/core/features/requests/auth.request.ts'
import { useToastStore } from '@src/core/stores/toast.store.ts'
import { type SignUpSchema, signUpSchema } from '@src/pages/sign-up-page/sign-up.schema.ts'
import FormLayout from '@src/widgets/layouts/form-layout/FormLayout.tsx'
import Button from '@src/widgets/ui/buttons/Button.tsx'
import Field from '@src/widgets/ui/fields/Field.tsx'
import ScreenLoader from '@src/widgets/ui/loaders/ScreenLoader.tsx'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const SignUpPage: FC = () => {
  const {
    register, handleSubmit, reset, formState: {
      errors, isSubmitting
    }
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange'
  })
  const addToast = useToastStore(store => store.addToast)
  const navigate = useNavigate()
  const [ registerUser ] = useMutation(
    AuthRequest.REGISTER,
    {
      onCompleted: (_) => addToast('Вы успешно зарегестрированы', ToastType.INFO),
      onError: (error) => addToast(error.message || 'Ошибка', ToastType.ERROR)
    }
  )

  const submitHandler = async (data: SignUpSchema) => {
    const { email, password } = data

    try {
      await registerUser({
        variables: {
          input: {
            email: email,
            password: password
          }
        }
      })

      reset()
      navigate(AppRoutes.SIGN_IN)
    } catch (error) {}
  }

  return (
    <FormLayout heading="Регистрация">
      <ScreenLoader isLoading={isSubmitting}/>

      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-10 group w-full">
        <div className="flex flex-col gap-5">
          <Field
            label="Введите свой email:"
            placeholder="my-email@mail.com"
            type="email"
            errors={errors}
            registry={register('email')}
            target="email"/>
          <Field
            label="Придумайте пароль:"
            placeholder="••••••••"
            type="password"
            errors={errors}
            registry={register('password')}
            target="password"/>
          <Field
            label="Повторите пароль:"
            placeholder="••••••••"
            type="password"
            errors={errors}
            registry={register('confirmPassword')}
            target="confirmPassword"/>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <h6 className="flex flex-row justify-center text-slate-500 text-xs">
            Уже есть аккаунт?
            <Link className="px-1 text-secondary-text/90 font-bold hover:text-white transition-colors" to={AppRoutes.SIGN_IN}>
              Войти
            </Link>
          </h6>

          <div className="w-full px-6 py-2">
            <Button className="w-full">
              {isSubmitting ? "Создание..." : "Создать"}
            </Button>
          </div>
        </div>
      </form>
    </FormLayout>
  )
}

export default SignUpPage
