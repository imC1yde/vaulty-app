import { useLazyQuery } from '@apollo/client/react'
import { useBreakpoint } from '@src/common/hooks/use-mobile.hook.ts'
import { RawgRequest } from '@src/core/features/requests/rawg.request.ts'
import ActionButton from "@src/widgets/ui/buttons/action-button/ActionButton"
import ClipLoader from '@src/widgets/ui/loaders/ClipLoader.tsx'
import Pagination from "@src/widgets/ui/pagination/Pagination"
import { Check, SearchIcon } from 'lucide-react'
import { type FC, useEffect, useMemo, useState } from 'react'

interface IRemoteSelectorProps {
  readonly type: 'genres' | 'platforms'
  readonly selectedItems: string[]
  readonly onSelect: (items: string[]) => void
}

const RemoteSelector: FC<IRemoteSelectorProps> = ({ type, selectedItems, onSelect }) => {
  const [ page, setPage ] = useState<number>(1)
  const [ localSelected, setLocalSelected ] = useState<string[]>(selectedItems)
  const { isMobile, isTablet, isDesktop } = useBreakpoint()

  const pageSize = useMemo(() => {
      if (isDesktop || isTablet) return 21
      else return 16
    }, [ isDesktop, isMobile, isTablet ]
  )

  const query = type === 'genres' ? RawgRequest.GET_GENRES : RawgRequest.GET_PLATFORMS
  const [ getData, { data, loading } ] = useLazyQuery<any>(query)

  const { items, totalPages } = useMemo(() => {
    const response = data?.[type === 'genres' ? 'getAllGenres' : 'getAllPlatforms']
    return {
      items: response?.data || [],
      totalPages: response?.totalPages || 0
    };
  }, [ data, type ])

  const fetchPage = (targetPage: number) => {
    setPage(targetPage);
    getData({
      variables: {
        input: {
          page: targetPage,
          pageSize: pageSize
        }
      }
    })
  }

  useEffect(() => {
    fetchPage(1)
  }, [ type ])

  const toggleSelection = (name: string) => {
    setLocalSelected(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [ ...prev, name ]
    )
  }

  return (
    <div className="flex flex-col h-[80vh] md:h-[600px] overflow-hidden">
      <div
        className={`
          relative flex-1 min-h-0 pr-1 custom-scrollbar
          ${loading ? 'overflow-hidden' : 'overflow-y-auto'}
          touch-pan-y
          pointer-events-auto`}
        onWheel={(e) => e.stopPropagation()}
      >
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <ClipLoader color="#3b82f6" size={35}/>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map((item: any) => {
            const isSelected = localSelected.includes(item.name)
            return (
              <div
                key={item}
                onClick={() => toggleSelection(item)}
                className={`
                  group relative flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer
                  ${isSelected
                  ? 'border-accent bg-accent/5 shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]'
                  : 'border-main-border bg-secondary-bg/20 hover:border-accent/40'}
                `}
              >
                <span className={`text-xs font-medium truncate ${isSelected ? 'text-accent' : 'text-gray-400 group-hover:text-gray-200'}`}>
                  {item}
                </span>

                {isSelected && (
                  <div className="shrink-0 ml-2 animate-in zoom-in duration-200">
                    <Check size={14} strokeWidth={3} className="text-[#6366f1] filter drop-shadow-[0_0_5px_#3b82f6]"/>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {!loading && items.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-faded-text/40 opacity-50">
            <SearchIcon size={40} strokeWidth={1} className="mb-2"/>
            <p className="text-sm">Начните поиск...</p>
          </div>
        )}
      </div>

      <div className="pt-4 mt-2 border-t border-main-border/30 flex flex-col gap-4 shrink-0">
        <div className="flex justify-center scale-[0.8] origin-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={fetchPage}
          />
        </div>

        <ActionButton.Primary
          onClick={() => onSelect(localSelected)}
          className="w-full h-11"
        >
          Сохранить выбор ({localSelected.length})
        </ActionButton.Primary>
      </div>
    </div>
  )
}

export default RemoteSelector