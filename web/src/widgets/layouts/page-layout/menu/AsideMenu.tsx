import { useMutation } from '@apollo/client/react'
import { ToastType } from '@src/common/enums/toast-type.enum.ts'
import { useMutationForm } from '@src/common/hooks/use-mutation-form.hook.ts'
import { AuthRequest } from '@src/core/features/requests/auth.request.ts'
import { UserRequest } from '@src/core/features/requests/user.request.ts'
import { useProfileStore } from '@src/core/stores/profile.store.ts'
import { useToastStore } from '@src/core/stores/toast.store.ts'
import NavbarTab from '@src/widgets/layouts/page-layout/header/components/NavbarTab.tsx'
import { data } from '@src/widgets/layouts/page-layout/header/data.ts'
import { deleteUserSchema, type DeleteUserSchema } from '@src/widgets/layouts/page-layout/schemas/delete-user.schema.ts'
import { updateUserSchema, type UpdateUserSchema } from '@src/widgets/layouts/page-layout/schemas/update-user.schema.ts'
import ActionButton from '@src/widgets/ui/buttons/action-button/ActionButton'
import Button from '@src/widgets/ui/buttons/Button.tsx'
import Field from '@src/widgets/ui/field/Field'
import ScreenLoader from '@src/widgets/ui/loaders/ScreenLoader.tsx'
import { motion } from 'framer-motion'
import { CheckIcon, LogInIcon, LogOutIcon, MenuIcon } from 'lucide-react'
import { type FC, memo, useState } from 'react'

interface IAsideMenuProps {
  readonly close: () => void
  readonly signUpHandler: () => void
}

const AsideMenu: FC<IAsideMenuProps> = memo((props) => {
  const [ isDeleting, setIsDeleting ] = useState<boolean>(false)
  const { clearProfile, setUser, isAuthorized } = useProfileStore()
  const { addToast } = useToastStore()

  const [ logout, { loading: logoutLoading } ] = useMutation(AuthRequest.SIGN_OUT, {
    onCompleted: () => {
      clearProfile()
      addToast('Вы вышли', ToastType.INFO)
    }
  })

  const updateUsername = useMutationForm<UpdateUserSchema>({
    schema: updateUserSchema,
    mutation: UserRequest.UPDATE_USER,
    formOptions: {
      mode: 'onChange',
      reValidateMode: 'onChange'
    },
    mapVariables: (data) => ({ input: { username: data.username } }),
    mutationOptions: {
      onCompleted: (res) => {
        if (res.updateUser) setUser({ ...res.updateUser })
        addToast('Имя обновлено', ToastType.INFO)
      }
    }
  })

  const deleteAccount = useMutationForm<DeleteUserSchema>({
    schema: deleteUserSchema,
    mutation: UserRequest.DELETE_USER,
    formOptions: {
      mode: 'onChange'
    },
    mutationOptions: {
      onCompleted: () => {
        clearProfile()
        addToast('Прощайте!', ToastType.INFO)
      }
    }
  })

  const isLoading = updateUsername.mutationResult.loading || deleteAccount.mutationResult.loading || logoutLoading

  return (
    <aside className="fixed inset-0 z-[100] flex justify-end">
      <ScreenLoader isLoading={isLoading}/>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 backdrop-blur-md bg-black/20"
        onClick={() => props.close()}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-[320px] h-full border-l border-main-border bg-secondary-bg/80 backdrop-blur-2xl p-6 flex flex-col shadow-2xl overflow-y-auto custom-scrollbar"
      >
        <div className="mb-8 flex flex-row justify-between items-center w-full shrink-0">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-text font-bold">
        Навигация
      </span>
          <Button
            onClick={props.close}
            className="p-2 flex items-center justify-center flex-shrink-0 transition-transform active:scale-90"
          >
            <MenuIcon/>
          </Button>
        </div>

        <nav className="flex flex-col gap-3 mb-10 shrink-0">
          {data.map(([ label, link ], i) => (
            <NavbarTab key={i} link={link}>
              {label}
            </NavbarTab>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-main-border/50">
          {isAuthorized ? (
            <div className="space-y-6">

              <div className="space-y-4">
                <form onSubmit={updateUsername.onSubmit} className="flex flex-col gap-2">
                  <Field.Label>Изменить имя</Field.Label>
                  <div className="flex items-stretch gap-2 h-12 w-full">
                    <div className="flex-1 h-full">
                      <Field.Input
                        error={updateUsername.form.formState.errors.username}
                        registry={updateUsername.form.register('username')}
                        placeholder="имя пользователя"
                        className="h-full w-full bg-primary-bg/40 focus:border-accent/40 transition-all"
                      />
                    </div>
                    <ActionButton.Neon
                      type="submit"
                      className="h-full aspect-square flex-none p-0 flex items-center justify-center"
                    >
                      <CheckIcon size={18} className="shrink-0"/>
                    </ActionButton.Neon>
                  </div>
                  <Field.Error error={updateUsername.form.formState.errors.username}/>
                </form>

                <button
                  onClick={() => logout()}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-faded-text transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  <LogOutIcon size={16}/>
                  Выйти
                </button>
              </div>

              <div className="h-[1px] bg-main-border/40 w-full"/>

              <div className="space-y-4">
                {!isDeleting ? (
                  <button
                    onClick={() => setIsDeleting(true)}
                    className="w-full py-3 rounded-xl bg-red-500/5 hover:bg-red-500/10 text-red-400 transition-colors text-xs font-bold uppercase tracking-widest border border-red-500/10"
                  >
                    Удалить аккаунт
                  </button>
                ) : (
                  <form onSubmit={deleteAccount.onSubmit} className="animate-in slide-in-from-right-2 space-y-4">
                    <div className="space-y-1.5">
                      <Field.Label>Подтвердите удалени паролем</Field.Label>
                      <Field.Input
                        type="password"
                        error={deleteAccount.form.formState.errors.password}
                        registry={deleteAccount.form.register('password')}
                        placeholder="••••••••"
                        className="bg-red-500/5 border-red-500/10 focus:border-red-500/30"
                      />
                      <Field.Error error={deleteAccount.form.formState.errors.password}/>
                    </div>

                    <div className="flex flex-row gap-2 h-11">
                      <ActionButton.Primary
                        type="button"
                        onClick={() => setIsDeleting(false)}
                        className="flex-[0.4]"
                      >
                        Назад
                      </ActionButton.Primary>
                      <ActionButton.Danger
                        type="submit"
                        isLoading={deleteAccount.mutationResult.loading}
                        className="flex-[0.6]"
                      >
                        Удалить
                      </ActionButton.Danger>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <div className="pt-6 border-t border-main-border/50">
              <Button
                onClick={props.signUpHandler}
                className="w-full py-4 flex flex-row items-center justify-center gap-3 bg-accent/10 border border-accent/20 hover:bg-accent/20 rounded-xl transition-all"
              >
                <span className="font-medium">Войти</span>
                <LogInIcon size={18}/>
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </aside>
  )
})

export default AsideMenu