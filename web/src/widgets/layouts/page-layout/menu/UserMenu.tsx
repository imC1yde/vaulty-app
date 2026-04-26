import { useMutation } from '@apollo/client/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ToastType } from '@src/common/enums/toast-type.enum.ts'
import { useMutationForm } from '@src/common/hooks/use-mutation-form.hook.ts'
import { AuthRequest } from '@src/core/features/requests/auth.request.ts'
import { UserRequest } from '@src/core/features/requests/user.request.ts'
import { useProfileStore } from '@src/core/stores/profile.store.ts'
import { useToastStore } from '@src/core/stores/toast.store.ts'
import { type DeleteUserSchema, deleteUserSchema } from '@src/widgets/layouts/page-layout/schemas/delete-user.schema.ts'
import { type UpdateUserSchema, updateUserSchema } from '@src/widgets/layouts/page-layout/schemas/update-user.schema.ts'
import ActionButton from '@src/widgets/ui/buttons/action-button/ActionButton.tsx'
import MenuButton from '@src/widgets/ui/buttons/MenuButton.tsx'
import Field from '@src/widgets/ui/field/Field.tsx'
import ScreenLoader from '@src/widgets/ui/loaders/ScreenLoader.tsx'
import { CheckIcon, LogOutIcon, TrashIcon, UserIcon } from 'lucide-react'
import { type FC, useState } from "react"

const UserMenu: FC = () => {
  const [ isDeleting, setIsDeleting ] = useState<boolean>(false)
  const { clearProfile, setUser } = useProfileStore()
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
    mapVariables: (data) => ({
      input: {
        username: data.username
      }
    }),
    mutationOptions: {
      onCompleted: (res) => {
        if (res.updateUser) setUser({
          id: res.updateUser.id,
          email: res.updateUser.email,
          username: res.updateUser.username
        })
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
        addToast('Аккаунт успешно удален!', ToastType.INFO)
      }
    },
    mapVariables: (data) => ({
      input: {
        password: data.password
      }
    })
  })

  const isLoading = updateUsername.mutationResult.loading || deleteAccount.mutationResult.loading || logoutLoading

  return (
    <div className="flex items-center gap-4">
      <ScreenLoader isLoading={isLoading}/>

      <DropdownMenu.Root onOpenChange={(open) => !open && setIsDeleting(false)}>
        <DropdownMenu.Trigger asChild>
          <button className="w-10 h-10 flex items-center justify-center bg-secondary-bg border border-white/10 rounded-lg hover:border-accent/50 transition-colors outline-none">
            <UserIcon size={20} className="text-faded-text"/>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={12}
            className="z-[60] min-w-[300px] bg-secondary-bg border border-main-border p-5 shadow-2xl rounded-2xl animate-in fade-in zoom-in-95"
          >
            {!isDeleting ? (
              <>
                <form onSubmit={updateUsername.onSubmit} className="flex flex-col gap-2">
                  <Field.Label>Изменить имя</Field.Label>

                  <div className="flex items-stretch gap-2 h-12">
                    <div className="flex-1 h-full">
                      <Field.Input
                        error={updateUsername.form.formState.errors.username}
                        registry={updateUsername.form.register('username')}
                        placeholder="Новое имя"
                        className="h-full bg-primary-bg/40 focus:border-accent/40 transition-all"
                      />
                    </div>

                    <ActionButton.Neon
                      type="submit"
                      className="h-full aspect-square flex-none p-0 flex items-center justify-center"
                    >
                      <CheckIcon/>
                    </ActionButton.Neon>
                  </div>

                  <Field.Error error={updateUsername.form.formState.errors.username}/>
                </form>

                <div className="h-[1px] bg-white/5 my-5"/>

                <div className="space-y-1">
                  <MenuButton
                    onClick={() => logout()}
                    icon={<LogOutIcon size={18}/>}
                  >
                    Выйти
                  </MenuButton>

                  <MenuButton
                    variant="destructive"
                    onClick={() => setIsDeleting(true)}
                    icon={<TrashIcon size={18}/>}
                  >
                    Удалить аккаунт
                  </MenuButton>
                </div>
              </>
            ) : (
              <form onSubmit={deleteAccount.onSubmit} className="animate-in slide-in-from-right-2 space-y-4">
                <div className="space-y-1.5">
                  <Field.Label>Подтвердите удаление паролем</Field.Label>
                  <Field.Input
                    type="password"
                    error={deleteAccount.form.formState.errors.password}
                    registry={deleteAccount.form.register('password')}
                    placeholder="••••••••"
                  />
                  <Field.Error error={deleteAccount.form.formState.errors.password}/>
                </div>

                <div className="flex flex-row gap-2 h-11">
                  <ActionButton.Danger
                    type="submit"
                    isLoading={deleteAccount.mutationResult.loading}
                  >
                    Удалить аккаунт
                  </ActionButton.Danger>

                  <ActionButton.Primary
                    type="submit"
                    onClick={() => setIsDeleting(false)}
                  >
                    Назад
                  </ActionButton.Primary>
                </div>
              </form>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}

export default UserMenu