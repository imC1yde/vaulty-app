import type { IUserCatalogItem } from '@src/common/interfaces/user-catalog-item.interface.ts'
import { AppConfig } from '@src/core/configs/app.config'
import SpinnerLoader from '@src/widgets/ui/loaders/SpinnerLoader.tsx'
import { ImageOff } from 'lucide-react'
import { type FC, useState } from 'react'

interface IInventoryCardProps {
  item: IUserCatalogItem
  index: number
}

const InventoryCard: FC<IInventoryCardProps> = ({ item, index }) => {
  const [ status, setStatus ] = useState<'loading' | 'error' | 'success'>('loading')

  return (
    <div className="flex flex-col gap-2 p-2 rounded-xl bg-gray-900/50 border border-gray-800 transition-transform hover:scale-105">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-800 flex items-center justify-center">

        <div className="absolute top-2 right-2 z-20 flex items-center justify-center w-7 h-7 rounded-lg bg-black/40 backdrop-blur-md border border-white/10">
          <span className="text-[11px] font-bold text-white/80">
            {index + 1}
          </span>
        </div>

        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <SpinnerLoader/>
          </div>
        )}

        {status === 'error' ? (
          <div className="flex flex-col items-center justify-center gap-3 text-gray-600 animate-in fade-in duration-500">
            <ImageOff className="w-12 h-12" strokeWidth={1.5}/>
            <span className="text-[10px] uppercase font-bold tracking-widest text-center">
              Нет изображения
            </span>
          </div>
        ) : (
          <img
            src={item.image.replace('s3:9000', AppConfig.APP_HOST)}
            alt={item.name}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              status === 'success' ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setStatus('success')}
            onError={() => setStatus('error')}
          />
        )}
      </div>

      <p className="px-1 text-sm font-medium text-gray-200 truncate" title={item.name}>
        {item.name}
      </p>
    </div>
  )
}

export default InventoryCard