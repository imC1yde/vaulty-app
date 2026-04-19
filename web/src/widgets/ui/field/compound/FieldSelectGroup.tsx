import { useOnClickOutside } from '@src/common/hooks/use-on-click-outside.hook.ts'
import type { Nullable } from '@src/common/utilities/nullable.util.ts'
import { ChevronDown } from 'lucide-react'
import { createContext, type FC, type HTMLAttributes, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface ISelectContext {
  value: any
  onChoice: (value: any) => void
  setIsOpen: (value: boolean) => void
}

export const SelectContext = createContext<Nullable<ISelectContext>>(null)

interface IFieldSelectGroup extends HTMLAttributes<HTMLDivElement> {
  readonly value: number | string
  readonly placeholder?: Nullable<string>
  readonly onChoice: (value: any) => void
}

const FieldSelectGroup: FC<IFieldSelectGroup> = ({ value, onChoice, children, placeholder = "Выбрать..." }) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const [ coords, setCoords ] = useState<{ top: number, left: number, width: number }>({ top: 0, left: 0, width: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(containerRef, () => setIsOpen(false))

  const handleOpen = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width
      })
    }
    setIsOpen(!isOpen)
  }

  return (
    <SelectContext.Provider value={{ value, onChoice: onChoice ?? (() => null), setIsOpen }}>
      <div className="relative w-full" ref={containerRef}>
        <div
          onClick={handleOpen}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white flex justify-between items-center cursor-pointer hover:border-accent/40 transition-all shadow-sm"
        >
          <span className={value ? "text-white" : "text-faded-text/50"}>
            {value || placeholder}
          </span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : 'text-faded-text'}`}
          />
        </div>

        {isOpen && createPortal(
          <div
            data-select-portal
            style={{
              position: 'absolute',
              top: coords.top,
              left: coords.left,
              width: coords.width
            }}
            className="bg-[#1a1b23] border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[9999] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="max-h-[240px] overflow-y-auto p-1">
              {children}
            </div>
          </div>,
          document.body
        )}
      </div>
    </SelectContext.Provider>
  )
}

export default FieldSelectGroup