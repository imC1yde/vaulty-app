import { useLazyQuery, useMutation } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ToastType } from '@src/common/enums/toast-type.enum'
import { useBreakpoint } from '@src/common/hooks/use-mobile.hook.ts'
import type { IRawgGame } from '@src/common/interfaces/rawg-game.interface.ts'
import { isQueryReady } from '@src/common/utilities/is-query-ready.util.ts'
import { GameInventoryRequest } from '@src/core/features/requests/game-inventory.request.ts'
import { RawgRequest } from '@src/core/features/requests/rawg.request.ts'
import { useToastStore } from "@src/core/stores/toast.store"
import { type SearchSchema, searchSchema } from '@src/pages/game-inventory-page/schemas/search.schema.ts'
import ActionButton from '@src/widgets/ui/buttons/action-button/ActionButton.tsx'
import Field from '@src/widgets/ui/field/Field'
import Pagination from '@src/widgets/ui/pagination/Pagination.tsx'
import { ImageOff, SearchIcon } from 'lucide-react'
import { type FC, useMemo, useState } from "react"
import { useForm } from 'react-hook-form'
import { ClipLoader } from 'react-spinners'

interface IGameFormProps {
  readonly onSuccess?: () => void
  readonly currentPage: number
  readonly pageSize: number
}

const GameForm: FC<IGameFormProps> = ({ onSuccess, currentPage, pageSize }) => {
  const [ page, setPage ] = useState<number>(1)
  const [ selectedGame, setSelectedGame ] = useState<number>()
  const { addToast } = useToastStore()
  const { isMobile, isTablet, isDesktop } = useBreakpoint()

  const paginationSize = useMemo(() => {
    if (isDesktop) return 50
    if (isTablet) return 30
    return 20
  }, [ isTablet, isDesktop, isMobile ])

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema)
  })

  const [ getGames, { data, loading } ] = useLazyQuery(RawgRequest.GET_RAWG_GAMES)

  const [ addGame, { loading: isAdding } ] = useMutation(GameInventoryRequest.CREATE_GAME, {
    refetchQueries: [ {
      query: GameInventoryRequest.GET_ALL_GAMES,
      variables: { input: { page: currentPage, pageSize } }
    } ],
    onCompleted: () => {
      addToast('Игра добавлена в коллекцию', ToastType.INFO)
      onSuccess?.()
    },
    onError: (error) => {
      addToast(error.message, ToastType.ERROR)
    }
  })

  const onSubmit = (formData: SearchSchema, targetPage: number = 1) => {
    setPage(targetPage)
    getGames({
      variables: {
        input: {
          search: formData.search,
          page: targetPage,
          pageSize: paginationSize
        }
      }
    })
  }

  const handlePageChange = (newPage: number) => {
    onSubmit(getValues(), newPage)
  }

  const { data: games, totalPages } = useMemo(() => {
    if (isQueryReady(data)) return data.getRawgGames
    return { data: [], totalPages: 0 }
  }, [ data ])

  return (
    <div className="flex flex-col h-[80vh] md:h-[600px] overflow-hidden">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col gap-2 shrink-0 mb-4"
      >
        <div className="flex items-center gap-3 pr-1">
          <div className="flex-1 min-w-0">
            <Field.Input
              placeholder="Название игры..."
              registry={register('search')}
              error={errors.search}
              className="h-12 w-full bg-primary-bg/40 focus:border-accent/40"
            />
          </div>

          <div className="!w-12">
            <ActionButton.Neon
              type="submit"
              className="!min-w-[48px] !p-0 flex items-center justify-center shrink-0 aspect-square"
              disabled={isAdding}
            >
              <SearchIcon size={20}/>
            </ActionButton.Neon>
          </div>
        </div>

        <Field.Error error={errors?.search}/>
      </form>

      <div
        className={`
          relative flex-1 min-h-0 pr-1
          ${loading ? 'overflow-hidden' : 'overflow-y-auto'}
          touch-pan-y
          pointer-events-auto`}
        onWheel={(e) => e.stopPropagation()}
      >

        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <ClipLoader
              color="#3b82f6"
              size={35}
              speedMultiplier={0.9}
            />
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {games.map((game: IRawgGame) => (
            <div
              key={game.rawgId}
              onClick={() => {
                if (!isAdding) {
                  setSelectedGame(game.rawgId)
                  addGame({ variables: { id: game.rawgId } })
                }
              }}
              className="group cursor-pointer flex flex-col gap-2 pointer-events-auto"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border-2 border-main-border group-hover:border-accent/60 transition-all shadow-lg bg-secondary-bg/20">
                {game.backgroundImage ? (
                  <img
                    src={game.backgroundImage}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/40 text-gray-600 gap-2">
                    <ImageOff size={24} strokeWidth={1.5} className="opacity-50"/>
                  </div>
                )}

                {(selectedGame === game.rawgId) && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px] z-10">
                    <ClipLoader
                      color="#3b82f6"
                      size={16}
                      speedMultiplier={0.9}
                    />
                  </div>
                )}
              </div>

              <span className="text-[10px] font-bold text-gray-300 truncate text-center group-hover:text-white px-1">
              {game.name}
            </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 mt-2 border-t border-main-border/30 flex justify-center shrink-0 scale-[0.75] origin-bottom">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default GameForm