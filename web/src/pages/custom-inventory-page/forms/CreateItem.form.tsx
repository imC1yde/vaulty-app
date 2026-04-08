import { ToastType } from '@src/common/enums/toast-type.enum'
import { useMutationForm } from '@src/common/hooks/use-mutation-form.hook.ts'
import { CustomInventoryRequest } from '@src/core/features/requests/custom-inventory.request.ts'
import { useToastStore } from '@src/core/stores/toast.store'
import { type CreateItemSchema, createItemSchema } from '@src/pages/custom-inventory-page/create-item.schema'
import ActionButton from '@src/widgets/ui/buttons/action-button/ActionButton'
import Field from '@src/widgets/ui/field/Field.tsx'
import type { ChangeEvent, FC } from 'react'


const CreateItemForm: FC = () => {
  const { addToast } = useToastStore()
  const createItem = useMutationForm<CreateItemSchema>({
    schema: createItemSchema,
    mutation: CustomInventoryRequest.CREATE_ITEM,
    formOptions: {
      mode: 'onChange',
      reValidateMode: 'onChange',
      defaultValues: {
        name: '',
        description: ''
      }
    },
    mapVariables: (data) => ({
      input: {
        name: data.name,
        description: data.description
      },
      file: data.image
    }),
    mutationOptions: {
      onCompleted: (res) => {
        const itemData = res.createItem
        if (!itemData) {
          addToast('Создание не удалось', ToastType.ERROR)
          return
        }

        addToast('Коллекционный предмет создан', ToastType.INFO)
      },
      onError: (error) => addToast(error.message, ToastType.ERROR)
    }
  })

  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    createItem.form.setValue('image', file, { shouldValidate: true })
  }

  return (
    <form onSubmit={createItem.onSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Field.Label>Название предмета</Field.Label>
        <Field.Input
          registry={createItem.form.register('name')}
          error={createItem.form.formState.errors.name}
          type="text"
          placeholder="Мой новый предмет"
          className="relative z-10 h-12 w-full bg-primary-bg/60 border border-main-border focus:border-accent/40 transition-all"
        />
        <Field.Error error={createItem.form.formState.errors.name}/>
      </div>

      <div className="flex flex-col gap-2">
        <Field.Label>Описание предмета</Field.Label>
        <Field.Textarea
          registry={createItem.form.register('description')}
          error={createItem.form.formState.errors.description}
          className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] outline-none transition-all min-h-[100px]"
          placeholder="Очередной предмет в моей обширной коллекции"
        />
        <Field.Error error={createItem.form.formState.errors.description}/>
      </div>

      <div className="flex flex-col gap-2">
        <Field.Label>Описание предмета</Field.Label>
        <Field.File
          registry={createItem.form.register('image')}
          error={createItem.form.formState.errors.image}
          onChange={fileHandler}
          className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[var(--color-accent)] outline-none transition-all min-h-[100px]"
        />
        <Field.Error error={createItem.form.formState.errors.image}/>
      </div>

      <ActionButton.Primary
        type="submit"
        isLoading={createItem.form.formState.isSubmitting}
        className="w-full bg-[var(--color-accent)] py-4 mt-2"
      >
        Создать
      </ActionButton.Primary>
    </form>
  )
}

export default CreateItemForm