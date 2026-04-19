import type { IPartialGame } from '@src/common/interfaces/game.interface.ts'
import ClipLoader from '@src/widgets/ui/loaders/ClipLoader.tsx'
import { ImageOff, StarIcon } from 'lucide-react'
import { type FC, useState } from "react"

interface IGameCardProps {
  readonly game: IPartialGame
  readonly index: number
}


const GameCard: FC<IGameCardProps> = ({ game, index }) => {
  const [ status, setStatus ] = useState<'loading' | 'error' | "success">('loading')

  return (
    <div className="flex flex-col gap-3 group px-2 py-2">
      <div className="
        relative aspect-[3/4] w-full rounded-xl overflow-hidden
        outline-accent outline-offset-2
        group-hover:outline-2 group-hover:outline-accent/70 group-hover:border-transparent
        transition-all duration-300 shadow-lg group-hover:scale-[1.03]
      ">

        <div className="absolute top-2 right-2 z-20 flex items-center justify-center w-7 h-7 rounded-lg bg-black/40 backdrop-blur-md border border-white/10">
          <span className="text-[11px] font-bold text-white/80">
            {index + 1}
          </span>
        </div>

        <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
          <StarIcon size={10} className="text-yellow-500 fill-yellow-500"/>
          <span className="text-[10px] font-bold text-white/90">{game.rating}</span>
        </div>

        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40">
            <ClipLoader size={20} color="#3b82f6"/>
          </div>
        )}

        {status === 'error' || !game.backgroundImage ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/60 text-gray-600 gap-2">
            <ImageOff size={32} strokeWidth={1.5} className="opacity-40"/>
            <span className="text-[8px] uppercase font-bold tracking-widest opacity-40">Нет фото</span>
          </div>
        ) : (
          <img
            src={game.backgroundImage}
            alt={game.name}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              status === 'success' ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setStatus('success')}
            onError={() => setStatus('error')}
          />
        )}
      </div>

      <div className="flex flex-col gap-2 px-1">
        <h3 className="text-sm font-bold text-gray-100 truncate group-hover:text-white transition-colors" title={game.name}>
          {game.name}
        </h3>

        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap gap-1">
            {game.genres?.slice(0, 3).map((genre: string) => (
              <span key={genre} className="text-[7px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                {genre}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-1">
            {game.platforms?.slice(0, 3).map((platform: string) => (
              <span key={platform} className="text-[7px] font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCard