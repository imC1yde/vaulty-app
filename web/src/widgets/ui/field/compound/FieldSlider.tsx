import type { FC, InputHTMLAttributes } from 'react'

interface IFieldSliderProps extends InputHTMLAttributes<HTMLInputElement> {}

const FieldSlider: FC<IFieldSliderProps> = ({ min, max, step, value, onChange, ...props }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-xs text-accent font-bold">{value}</span>
    </div>
    <input
      type="range" min={min} max={max} step={step} value={value}
      onChange={onChange}
      {...props}
      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
    />
  </div>
)

export default FieldSlider