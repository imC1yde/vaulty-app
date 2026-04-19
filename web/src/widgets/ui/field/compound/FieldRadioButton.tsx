import type { FC, InputHTMLAttributes } from 'react'

interface IFieldRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {}

const FieldRadioButton: FC<IFieldRadioButtonProps> = ({ value, name, checked, onChange, ...props }) => (
  <label className="flex items-center gap-2 cursor-pointer group">
    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${checked ? 'border-accent' : 'border-gray-500'}`}>
      {checked && <div className="w-2 h-2 rounded-full bg-accent"/>}
    </div>
    <input type="radio" className="hidden" name={name} value={value} checked={checked} onChange={onChange} {...props}/>
  </label>
)

export default FieldRadioButton