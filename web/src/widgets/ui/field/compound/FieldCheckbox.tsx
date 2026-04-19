import { Check } from "lucide-react"
import type { FC, InputHTMLAttributes } from "react"

interface IFieldCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label: string
  readonly onChange: (e: any) => void
}

const FieldCheckbox: FC<IFieldCheckboxProps> = ({ label, checked, onChange, disabled }: IFieldCheckboxProps) => {
  return (
    <label className={`
      flex items-center gap-3 cursor-pointer group p-3 rounded-xl border border-white/5 bg-white/5 
      transition-all hover:bg-white/10 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}>
      <div className={`
        w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
        ${checked ? 'bg-accent border-accent' : 'border-gray-500 group-hover:border-gray-400'}
      `}>
        {checked && <Check size={14} className="text-white stroke-[3px]"/>}
      </div>
      <span className="text-sm font-medium text-gray-200">{label}</span>
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
    </label>
  )
}

export default FieldCheckbox