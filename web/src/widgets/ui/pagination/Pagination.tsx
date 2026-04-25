import type { FC } from 'react'

interface IPaginationProps {
  readonly currentPage: number
  readonly totalPages: number
  readonly onPageChange: (page: number) => void
}

const Pagination: FC<IPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return (
    <nav className="flex items-center justify-center gap-4 mt-8 py-2">
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`dots-${index}`} className="text-gray-500 px-2 text-xl">
              ...
            </span>
          )
        }

        const isSelected = page === currentPage

        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`
              min-w-[48px] h-[48px] 
              flex items-center justify-center rounded-xl border font-bold text-lg
              transition-all duration-200
              hover:scale-105 active:scale-95 cursor-pointer
              ${isSelected
              ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-lg shadow-blue-500/20'
              : 'bg-transparent border-gray-800 text-[var(--color-accent)] hover:border-[var(--color-accent)]/50'
            }
            `}
          >
            {page}
          </button>
        )
      })}
    </nav>
  )
}

export default Pagination