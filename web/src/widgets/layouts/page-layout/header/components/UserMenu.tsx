import { motion } from "framer-motion";
import { CheckIcon, LogOutIcon, TrashIcon } from 'lucide-react'
import { type FC, useState } from "react"

interface IUserMenuProps {
  readonly close: () => void
  readonly onLogout: () => void
}

const UserMenu: FC<IUserMenuProps> = (props) => {
  const [ isDeleting, setIsDeleting ] = useState<boolean>(false)
  const [ nickname, setNickname ] = useState<string>("imC1yde")

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-0 top-12 w-64 bg-secondary-bg/95 border border-main-border backdrop-blur-2xl rounded-xl p-4 shadow-2xl z-[60]"
    >
      {!isDeleting ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-muted-text font-bold">Изменить ник</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="bg-primary-bg border border-white/5 rounded-md px-2 py-1.5 text-xs w-full focus:border-accent/50 outline-none transition-colors"
              />
              <button className="p-2 bg-accent/10 border border-accent/20 rounded-md hover:bg-accent/20 transition-colors">
                <CheckIcon size={14} className="text-accent"/>
              </button>
            </div>
          </div>

          <div className="h-[1px] bg-white/5 w-full"/>

          <div className="flex flex-col gap-2">
            <button
              onClick={props.onLogout}
              className="flex items-center gap-2 px-2 py-2 text-xs text-faded-text/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <LogOutIcon size={14}/>
              <span>Выйти из системы</span>
            </button>

            <button
              onClick={() => setIsDeleting(true)}
              className="flex items-center gap-2 px-2 py-2 text-xs text-red-400/60 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
            >
              <TrashIcon size={14}/>
              <span>Удалить аккаунт</span>
            </button>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 text-center">
          <span className="text-xs font-medium text-red-400">Вы уверены?</span>
          <p className="text-[10px] text-muted-text italic">Введите пароль для безвозвратного удаления данных</p>

          <input
            type="password"
            placeholder="Ваш пароль"
            className="bg-primary-bg border border-red-400/20 rounded-md px-2 py-2 text-xs outline-none focus:border-red-400/50"
          />

          <div className="flex gap-2">
            <button
              onClick={() => setIsDeleting(false)}
              className="flex-1 py-2 text-[10px] bg-white/5 rounded-md hover:bg-white/10 transition-colors"
            >
              Отмена
            </button>
            <button className="flex-1 py-2 text-[10px] bg-red-500/20 text-red-400 border border-red-500/20 rounded-md hover:bg-red-500/40 transition-colors">
              Удалить
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default UserMenu