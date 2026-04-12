import { useMutation } from '@apollo/client/react'
import { ToastType } from '@src/common/enums/toast-type.enum.ts'
import type { IUserCatalogItem } from '@src/common/interfaces/user-catalog-item.interface.ts'
import type { Nullable } from '@src/common/utilities/nullable.util.ts'
import { CustomInventoryRequest } from '@src/core/features/requests/custom-inventory.request.ts'
import { useToastStore } from '@src/core/stores/toast.store.ts'
import ItemForm from '@src/pages/custom-inventory-page/forms/Item.form.tsx'
import Modal from '@src/widgets/modals/Modal.tsx'
import ActionButton from '@src/widgets/ui/buttons/action-button/ActionButton.tsx'
import { type FC, useState } from 'react'

interface InventoryItemModalProps {
  onClose: () => void
  item?: Nullable<IUserCatalogItem>
  currentPage: number
  pageSize: number
}

const ItemDetails: FC<InventoryItemModalProps> = ({ item, onClose, currentPage, pageSize }) => {
  const [ isEditMode, setIsEditMode ] = useState<boolean>(false)
  const { addToast } = useToastStore()

  const [ deleteItem, { loading: isDeleting } ] = useMutation(CustomInventoryRequest.DELETE_ITEM, {
    refetchQueries: [
      {
        query: CustomInventoryRequest.GET_ALL_ITEMS,
        variables: {
          input: {
            page: currentPage,
            pageSize
          }
        }
      }
    ],
    onCompleted: () => {
      addToast('Предмет удален', ToastType.INFO)
      onClose()
    }
  })

  const handleClose = () => {
    setIsEditMode(false)
    onClose()
  }

  if (!item) return null
  return (
    <Modal
      isOpen={!!item}
      onClose={onClose}
      title={isEditMode ? "Редактирование" : item.name}
    >
      {!isEditMode ? (
        <div className="flex flex-col gap-6">
          {item.image && (
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-xl border border-gray-800"/>
          )}
          <div className="flex flex-col gap-2 w-full">
            <span className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">
              Описание
            </span>

            <div className="
              max-h-[200px] overflow-y-auto overflow-x-hidden pr-2
              text-gray-200 leading-relaxed text-sm
              scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent
            ">
              <p className="whitespace-pre-wrap break-words w-full">
                {item.description || "Описание отсутствует"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <ActionButton.Primary
              className="flex-1"
              onClick={() => setIsEditMode(true)}>
              Обновить
            </ActionButton.Primary>
            <ActionButton.Danger
              className="flex-1"
              disabled={isDeleting}
              onClick={() => deleteItem({ variables: { id: item.id } })}
            >
              {isDeleting ? "Удаление..." : "Удалить"}
            </ActionButton.Danger>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <ItemForm
            isUpdate
            initialData={item}
            onSuccess={handleClose}
            currentPage={currentPage}
            pageSize={pageSize}
          />

          <ActionButton.Neon
            onClick={() => setIsEditMode(false)}
          >
            Назад к просмотру
          </ActionButton.Neon>
        </div>
      )}
    </Modal>
  )
}

export default ItemDetails