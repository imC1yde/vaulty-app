import { ToastType } from '@src/common/enums/toast-type.enum.ts'
import { useToastStore } from '@src/core/stores/toast.store.ts'
import { AnimatePresence, motion } from 'framer-motion'

const Toast = () => {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`px-4 py-3 rounded-xl shadow-2xl border flex items-center gap-3 min-w-[280px]
              ${toast.type === ToastType.ERROR
              ? 'bg-slate-900 border-red-500/50 text-red-200'
              : 'bg-slate-900 border-indigo-500/50 text-indigo-200'}`}
          >
            <div className={`size-2 rounded-full animate-pulse ${toast.type === ToastType.ERROR ? 'bg-red-500' : 'bg-indigo-500'}`}/>
            <span className="text-sm font-medium">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-auto opacity-50 hover:opacity-100">✕</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Toast
