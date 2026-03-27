import { useMutation } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { APP_ROUTES } from '@src/common/constants/routes.constant.ts'
import { ToastType } from '@src/common/constants/toast-type.constant.ts'
import { AuthRequest } from '@src/core/features/requests/auth.request.ts'
import { useProfileStore } from '@src/core/stores/profile.store.ts'
import { useToastStore } from '@src/core/stores/toast.store.ts'
import FormLayout from '@src/modules/layouts/form-layout/FormLayout.tsx'
import Field from '@src/modules/ui/fields/Field.tsx'
import ScreenLoader from '@src/modules/ui/loaders/ScreenLoader.tsx'
import { type SignInSchema, signInSchema } from '@src/pages/sign-in-page/sign-in.schema.ts'
import { motion } from 'framer-motion'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const SignInPage: FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onChange'
  })
  const { addToast } = useToastStore()
  const { setProfile } = useProfileStore()
  const [ authorizeUser ] = useMutation(
    AuthRequest.AUTHORIZE,
    {
      onCompleted: (_) => addToast('Вы успешно вошли в систему!', ToastType.Info),
      onError: (error) => addToast(error.message || 'Ошибка авторизации!', ToastType.Error)
    }
  )

  const submitHandler = async (data: SignInSchema) => {
    try {
      const { data: responseData } = await authorizeUser({
        variables: {
          input: {
            email: data.email,
            password: data.password
          }
        }
      })

      const userData = (responseData as any).authorizeUser
      if (!userData?.token) addToast('Токен не был получен!', ToastType.Error)
      else setProfile(userData.token, userData.user)

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

        <div className="flex flex-col gap-6 items-center">
          <h6 className="flex flex-row justify-center text-slate-500 text-xs">
            Впервые?
            <Link className="px-1 text-secondary-text/90 font-bold hover:text-white transition-colors" to={APP_ROUTES.SIGN_UP}>
              Создайте аккаунт
            </Link>
          </h6>

          <motion.button
            className="mx-auto w-full max-w-[200px] h-12 bg-secondary-bg rounded-xl flex items-center justify-center text-sm font-medium transition-colors disabled:opacity-50 mb-2"
            disabled={isSubmitting}
            type="submit"
            whileHover={{
              outline: "2px solid var(--color-main-outline)",
              outlineOffset: "2px"
            }}
            whileTap={{
              scale: 0.98,
              outline: "4px solid var(--color-main-outline)",
              outlineOffset: "1px"
            }}
            initial={{ outline: "0px solid transparent" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {isSubmitting ? "Вход..." : "Войти"}
          </motion.button>
        </div>
      </form>
    </FormLayout>
  )
}

export default SignInPage