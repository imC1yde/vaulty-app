import type { INestable } from '@src/common/interfaces/nestable.interface.ts'
import type { Nullable } from '@src/common/utilities/nullable.util.ts'
import { X } from 'lucide-react'
import { type FC, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface IModalProps extends INestable {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly title?: Nullable<string>
}

const Modal: FC<IModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return

    const originalStyle = window.getComputedStyle(document.body).overflow

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100vh'

    const preventDefault = (e: WheelEvent | TouchEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-modal-content]')) return
      e.preventDefault()
    }

    document.addEventListener('wheel', preventDefault, { passive: false })
    document.addEventListener('touchmove', preventDefault, { passive: false })

    return () => {
      document.documentElement.style.overflow = originalStyle
      document.body.style.overflow = originalStyle
      document.body.style.height = 'auto';
      document.removeEventListener('wheel', preventDefault)
      document.removeEventListener('touchmove', preventDefault)
    }
  }, [ isOpen ])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="
        relative w-full max-w-lg bg-[#1a222c] border border-gray-800 rounded-2xl shadow-2xl
        animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh] overflow-hidden"
      >
        <header className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white transition-colors overflow-hidden">
            <X size={20}/>
          </button>
        </header>

        <div className="flex-1 min-h-0 p-6" data-modal-content>
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal