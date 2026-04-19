import type { INestable } from '@src/common/interfaces/nestable.interface.ts'
import { SelectContext } from '@src/widgets/ui/field/compound/FieldSelectGroup.tsx'
import { type FC, useContext } from 'react'

interface IFieldOptionProps extends INestable {
  readonly value: any
}

const FieldOption: FC<IFieldOptionProps> = ({ value: optionValue, children }) => {
  const context = useContext(SelectContext)
  if (!context) return null

  const isSelected = context.value === optionValue

  return (
    <div
      onClick={() => {
        context?.onChoice(optionValue)
        context.setIsOpen(false)
      }}
      className={`
        px-4 py-2.5 text-xs cursor-pointer rounded-lg transition-all mb-0.5 last:mb-0 flex items-center justify-between
        ${isSelected
        ? 'bg-accent/20 text-accent font-bold shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]'
        : 'text-gray-400 hover:bg-white/5 hover:text-white'}
      `}
    >
      {children || optionValue}
      {isSelected && <div className="w-1 h-1 rounded-full bg-accent shadow-[0_0_8px_#3b82f6]"/>}
    </div>
  )
}

export default FieldOption