import { ToastType } from '@src/common/enums/toast-type.enum'
import { useMutationForm } from '@src/common/hooks/use-mutation-form.hook.ts'
import type { IUserCatalogItem } from '@src/common/interfaces/user-catalog-item.interface.ts'
import type { Nullable } from '@src/common/utilities/nullable.util.ts'
import { CustomInventoryRequest } from '@src/core/features/requests/custom-inventory.request.ts'
import { useToastStore } from '@src/core/stores/toast.store'
import { type ItemSchema, itemSchema } from '@src/pages/custom-inventory-page/item.schema.ts'
import ActionButton from '@src/widgets/ui/buttons/action-button/ActionButton'
import Field from '@src/widgets/ui/field/Field.tsx'
import type { ChangeEvent, FC } from 'react'

interface ICreateItemFormProps {
  isUpdate?: boolean
  initialData?: Nullable<IUserCatalogItem>
  onSuccess?: Nullable<() => void>
  currentPage: number
  pageSize: number
}

const ItemForm: FC<ICreateItemFormProps> = ({ isUpdate, initialData, onSuccess, currentPage, pageSize }) => {
  const { addToast } = useToastStore()

  const mutationForm = useMutationForm<ItemSchema>({
    schema: itemSchema,
    mutation: isUpdate ? CustomInventoryRequest.UPDATE_ITEM : CustomInventoryRequest.CREATE_ITEM,
    formOptions: {
      defaultValues: {
        name: initialData?.name || '',
        description: initialData?.description || ''
      }
    },
    mapVariables: (data) => ({
      input: {
        id: initialData?.id,
        name: data.name,
        description: data.description
      },
      file: data.image
    }),
    mutationOptions: {
      refetchQueries: [ 'GetItems', 'getAllItems' ],
      onCompleted: () => {
        addToast(isUpdate ? 'Данные обновлены' : 'Предмет добавлен', ToastType.INFO);
        onSuccess?.()
      },
      onError: (error) => addToast(error.message, ToastType.ERROR)
    }
  })

  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) mutationForm.form.setValue('image', file, { shouldValidate: true })
  };

  return (
    <form onSubmit={mutationForm.onSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Field.Label>Название предмета</Field.Label>
        <Field.Input
          registry={mutationForm.form.register('name')}
          error={mutationForm.form.formState.errors.name}
          type="text"
          placeholder="Мой новый предмет"
          className="relative z-10 h-12 w-full bg-primary-bg/60 border border-main-border focus:border-accent/40 transition-all"
        />
        <Field.Error error={mutationForm.form.formState.errors.name}/>
      </div>

      <div className="flex flex-col gap-2">
        <Field.Label>Описание предмета</Field.Label>
        <Field.Textarea
          registry={mutationForm.form.register('description')}
          error={mutationForm.form.formState.errors.description}
          className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] outline-none transition-all min-h-[100px]"
          placeholder="Очередной предмет в моей обширной коллекции"
        />
        <Field.Error error={mutationForm.form.formState.errors.description}/>
      </div>

      <div className="flex flex-col gap-2">
        <Field.Label>Описание предмета</Field.Label>
        <Field.File
          registry={mutationForm.form.register('image')}
          error={mutationForm.form.formState.errors.image}
          onChange={fileHandler}
          className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] outline-none transition-all min-h-[100px]"
        />
        <Field.Error error={mutationForm.form.formState.errors.image}/>
      </div>

      <ActionButton.Primary
        type="submit"
        isLoading={mutationForm.form.formState.isSubmitting}>
        {isUpdate ? "Сохранить изменения" : "Создать"}
      </ActionButton.Primary>
    </form>
  )
}

export default ItemForm