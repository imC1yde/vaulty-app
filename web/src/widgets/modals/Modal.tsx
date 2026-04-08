import type { INestable } from '@src/common/interfaces/nestable.interface.ts'
import type { Nullable } from '@src/common/utilities/nullable.util.ts'
import { X } from 'lucide-react'
import { type FC, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps extends INestable {
  isOpen: boolean
  onClose: () => void
  title?: Nullable<string>
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return

    const originalStyle = window.getComputedStyle(document.body).overflow

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100vh'

    const preventDefault = (e: WheelEvent | TouchEvent) => {
      if ((e.target as HTMLElement).closest('.modal-content')) return
      e.preventDefault()
    };

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

      <div className="relative w-full max-w-lg bg-[#1a222c] border border-gray-800 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white transition-colors">
            <X size={20}/>
          </button>
        </header>

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal