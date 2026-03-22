import { zodResolver } from '@hookform/resolvers/zod'
import { APP_ROUTES } from '@src/common/constants/routes.constant.ts'
import FormLayout from '@src/modules/layouts/form-layout/FormLayout.tsx'
import Field from '@src/modules/ui/fields/Field.tsx'
import ScreenLoader from '@src/modules/ui/loaders/ScreenLoader.tsx'
import { signInSchema } from '@src/pages/sign-in-page/sign-in.schema.ts'
import { motion } from 'framer-motion'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const SignInPage: FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onChange'
  })

  const submitHandler = () => {
    reset()
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
            {isSubmitting ? "Загрузка..." : "Войти"}
          </motion.button>
        </div>
      </form>
    </FormLayout>
  )
}

export default SignInPage