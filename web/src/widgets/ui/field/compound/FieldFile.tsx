import type { Nullable } from '@src/common/utilities/nullable.util.ts'
import type { IZodField } from '@src/widgets/ui/field/zod-field.interface.ts'
import { Upload, X } from 'lucide-react'
import { type ChangeEvent, type FC, type InputHTMLAttributes, type MouseEvent, useRef, useState } from 'react'

interface IFieldFileProps extends InputHTMLAttributes<HTMLInputElement>, IZodField {}

const FieldFile: FC<IFieldFileProps> = ({ error, className, registry, onChange, ...props }) => {
  const [ preview, setPreview ] = useState<Nullable<string>>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
    registry?.onChange(e)

    if (!onChange) return
    onChange(e)
  }

  const clearFile = (e: MouseEvent) => {
    e.stopPropagation()
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className={`
        relative group cursor-pointer w-full aspect-video 
        bg-faded-dark/20 border-2 border-dashed rounded-xl
        flex flex-col items-center justify-center gap-3
        transition-all duration-300
        ${error ? 'border-danger/40 bg-danger/5' : 'border-accent-glow/40 hover:border-accent/40 hover:bg-faded-dark/40'}
        ${className}
      `}
    >
      {preview ? (
        <div className="relative w-full h-full p-2 animate-in fade-in zoom-in-95">
          <img src={preview} className="w-full h-full object-cover rounded-lg shadow-xl" alt="Preview"/>
          <button
            onClick={clearFile}
            className="absolute top-4 right-4 p-1.5 bg-danger/80 hover:bg-danger text-white rounded-lg backdrop-blur-md transition-colors"
          >
            <X size={16}/>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-slate-500 group-hover:text-slate-300 transition-colors">
          <Upload size={32} strokeWidth={1.5} className="text-accent/60"/>
          <span className="text-xs font-medium uppercase tracking-widest">Выбрать файл</span>
        </div>
      )}

      <input
        {...props}
        {...registry}
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default FieldFile