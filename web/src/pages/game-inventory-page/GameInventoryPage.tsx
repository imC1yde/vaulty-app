import { useQuery } from '@apollo/client/react'
import type { EsrbRating } from '@src/common/enums/esrb-rating.enum.ts'
import { useBreakpoint } from '@src/common/hooks/use-mobile.hook'
import type { IGame } from '@src/common/interfaces/game.interface.ts'
import { isQueryReady } from '@src/common/utilities/is-query-ready.util'
import type { Nullable } from '@src/common/utilities/nullable.util'
import { GameInventoryRequest } from '@src/core/features/requests/game-inventory.request.ts'
import GameCard from '@src/pages/game-inventory-page/components/GameCard.tsx'
import GameDetails from '@src/pages/game-inventory-page/components/GameDetails.tsx'
import FilterForm from '@src/pages/game-inventory-page/forms/FilterForm.tsx'
import GameForm from '@src/pages/game-inventory-page/forms/GameForm.tsx'
import type { GameFilterSchema } from '@src/pages/game-inventory-page/schemas/game-filter.schema.ts'
import Layout from '@src/widgets/layouts/page-layout/Layout.tsx'
import Modal from '@src/widgets/modals/Modal.tsx'
import Button from '@src/widgets/ui/buttons/Button'
import Pagination from '@src/widgets/ui/pagination/Pagination.tsx'
import { type FC, memo, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const GameInventoryPage: FC = memo(() => {
  const [ isCreateModalOpen, setIsCreateModalOpen ] = useState<boolean>(false)
  const [ isFilterModalOpen, setIsFilterModalOpen ] = useState<boolean>(false)
  const [ currentPage, setCurrentPage ] = useState<number>(1)
  const [ selectedGame, setSelectedGame ] = useState<Nullable<IGame>>(null)
  const { isMobile, isTablet, isDesktop } = useBreakpoint()
  const [ searchParams, setSearchParams ] = useSearchParams()

  const currentFilters = {
    name: searchParams.get('name'),
    rating: Number(searchParams.get('rating')) || 0,
    isCompleted: searchParams.get('isCompleted') === 'true' ? true : searchParams.get('isCompleted') === 'false' ? false : null,
    genres: searchParams.get('genres')?.split(',').filter(Boolean) || [],
    platforms: searchParams.get('platforms')?.split(',').filter(Boolean) || [],
    esrbRating: (searchParams.get('esrbRating') as EsrbRating) || null
  }

  const handleApplyFilters = (data: GameFilterSchema) => {
    const params: any = {}
    Object.entries(data).forEach(([ key, value ]) => {
      if (value !== null && value !== undefined && value !== '' && (Array.isArray(value) ? value.length > 0 : true)) {
        params[key] = Array.isArray(value) ? value.join(',') : String(value)
      }
    })
    setSearchParams(params)
    setIsFilterModalOpen(false)
  }

  const pageSize = useMemo(() => {
    if (isDesktop) return 60
    if (isTablet) return 40
    return 20
  }, [ isTablet, isDesktop, isMobile ])

  const { data } = useQuery(GameInventoryRequest.GET_ALL_GAMES, {
    variables: {
      input: {
        page: currentPage,
        pageSize
      },
      filter: {
        ...currentFilters
      }
    },
    context: { withCredentials: true }
  })

  const { data: games, totalPages, totalCount } = useMemo(() => {
    if (isQueryReady(data)) {
      return data.getAllGames
    }
    return { data: [], totalPages: 0, totalCount: 0 }
  }, [ data ])

  return (
    <Layout>
      <main className="max-w-[1440px] mx-auto p-4 md:p-8 flex flex-col gap-8 my-2">
        <section className="flex flex-row justify-between border-b border-gray-800 pb-6 items-center gap-4 md:items-end">
          <div className="flex-1">
            <h1 className="md:text-2xl text-xl font-bold text-white">Мои игры</h1>
            <p className="text-gray-400 text-[10px] md:text-sm">Всего игр: {totalCount}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 items-end">
            <Button
              onClick={() => setIsFilterModalOpen(true)}
              className="!min-w-max px-4 py-2 md:px-6 md:py-2.5 text-[10px] md:text-xs"
            >
              Фильтр
            </Button>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="!min-w-max !w-fit px-4 py-2 md:px-6 md:py-2.5 text-[10px] md:text-xs"
            >
              Добавить
            </Button>
          </div>
        </section>

        <section className="grid gap-4 sm:gap-6
          grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {games.map((game: any, i: number) => (
            <div key={game.id} onClick={() => setSelectedGame(game)} className="cursor-pointer">
              <GameCard game={game} index={(currentPage - 1) * pageSize + i}/>
            </div>
          ))}
        </section>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
      </main>

      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Фильтры">
        <div className="p-4 text-white">Здесь будут фильтры...</div>
      </Modal>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Добавить игру">
        <GameForm
          currentPage={currentPage}
          pageSize={pageSize}/>
      </Modal>

      <FilterForm
        isOpen={isFilterModalOpen}
        currentFilters={currentFilters}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
      />

      {selectedGame && (
        <GameDetails
          gameId={selectedGame.id}
          isOpen={!!selectedGame}
          onClose={() => setSelectedGame(null)}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      )}
    </Layout>
  )
})

export default GameInventoryPage