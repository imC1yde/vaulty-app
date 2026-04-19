import { useMutation, useQuery } from "@apollo/client/react"
import { ToastType } from "@src/common/enums/toast-type.enum"
import { GameInventoryRequest } from "@src/core/features/requests/game-inventory.request"
import { useToastStore } from '@src/core/stores/toast.store.ts'
import Modal from '@src/widgets/modals/Modal.tsx'
import ActionButton from "@src/widgets/ui/buttons/action-button/ActionButton"
import Field from '@src/widgets/ui/field/Field.tsx'
import ClipLoader from "@src/widgets/ui/loaders/ClipLoader.tsx"
import { ImageOff, Star } from 'lucide-react'
import { type FC, useState } from "react"

interface IGameDetailsProps {
  readonly gameId: string
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly currentPage: number
  readonly pageSize: number
}

const GameDetails: FC<IGameDetailsProps> = ({ gameId, isOpen, onClose, currentPage, pageSize }) => {
  const [ status, setStatus ] = useState<'loading' | 'error' | 'success'>('loading')
  const { addToast } = useToastStore()

  const { data, loading } = useQuery(GameInventoryRequest.GET_GAME, { variables: { id: gameId } })
  const [ updateGame, { loading: isUpdating } ] = useMutation(
    GameInventoryRequest.UPDATE_GAME,
    {
      onCompleted: () => addToast('Игра успешно обновлена', ToastType.INFO),
      onError: (error) => addToast(error.message || 'Обновление не удалось', ToastType.ERROR)
    }
  )
  const [ deleteGame, { loading: isDeleting } ] = useMutation(
    GameInventoryRequest.DELETE_GAME,
    {
      refetchQueries: [ {
        query: GameInventoryRequest.GET_ALL_GAMES,
        variables: {
          input: {
            page: currentPage,
            pageSize
          }
        }
      } ],
      onCompleted: () => {
        addToast('Игра успешно удалена', ToastType.INFO)
        onClose?.()
      },
      onError: (error) => addToast(error.message || 'Удаление не удалось', ToastType.ERROR)
    }
  )
  const isLoading = isDeleting || isUpdating

  const handleToggleCompleted = async (value: boolean) => {
    await updateGame({
      variables: {
        input: { id: gameId, isCompleted: value }
      }
    })
  }

  const game = data?.getGameById
  if (loading || !game) return <div className="flex justify-center p-10"><ClipLoader color="#3b82f6"/></div>

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={game?.name || "Загрузка..."}
    >
      <div className="flex flex-col h-full">

        <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-6">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-secondary-bg/20 shrink-0">
            {status === 'loading' && game.backgroundImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm z-10">
                <ClipLoader color="#3b82f6" size={30}/>
              </div>
            )}

            {(!game.backgroundImage || status === 'error') ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-secondary-bg text-gray-500 gap-4">
                <div className="p-4 rounded-full bg-white/5 border border-white/10">
                  <ImageOff size={48} strokeWidth={1} className="opacity-20"/>
                </div>
                <span className="text-xs uppercase font-bold tracking-[0.2em] opacity-30">
                  Изображение отсутствует
                </span>
              </div>
            ) : (
              <img
                src={game.backgroundImage}
                alt={game.name}
                className={`w-full h-full object-cover transition-opacity duration-700 ${status === 'success' ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setStatus('success')}
                onError={() => setStatus('error')}
              />
            )}

            <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
              <Star size={14} className="text-yellow-500 fill-yellow-500"/>
              <span className="font-bold text-white text-sm">{game.rating}</span>
            </div>
          </div>

          <div className="space-y-4 px-1">
            <div className="flex justify-between items-start gap-4">
              <Field.Checkbox label="Пройдено" checked={game.isCompleted} onChange={handleToggleCompleted} disabled={isUpdating}/>
            </div>

            <p className="text-sm text-faded-text leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
              {game.description || "Описание отсутствует"}
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-faded-text/60 uppercase tracking-widest">Дата релиза</span>
                <p className="text-white font-medium">{game.released ? new Date(game.released).toLocaleDateString() : '—'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-faded-text/60 uppercase tracking-widest">ESRB Рейтинг</span>
                <p className="text-white font-medium">{game.esrbRating || 'Not Rated'}</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-faded-text/60 uppercase font-bold tracking-widest">Жанры</span>
              <div className="flex flex-wrap gap-1.5">
                {game.genres.map((genre: string) => (
                  <span key={genre} className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">{genre}</span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-faded-text/60 uppercase font-bold tracking-widest">Платформы</span>
              <div className="flex flex-wrap gap-1.5">
                {game.platforms.map((platform: string) => (
                  <span key={platform} className="text-[10px] font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">{platform}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 pt-4 mt-4 border-t border-white/5 flex gap-3">
          <ActionButton.Danger
            onClick={() => deleteGame({ variables: { id: gameId } })}
            disabled={isLoading}
          >
            Удалить
          </ActionButton.Danger>
        </div>
      </div>
    </Modal>
  )
}

export default GameDetails