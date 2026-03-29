import { AnimatePresence, motion } from 'framer-motion'
import { type FC } from 'react'
import { createPortal } from 'react-dom';
import { BarLoader } from 'react-spinners'

interface IScreenLoaderProps {
  readonly isLoading: boolean
}

const ScreenLoader: FC<IScreenLoaderProps> = (props) => {
  return createPortal(
    <AnimatePresence>
      {props.isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm"
        >
          <BarLoader/>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default ScreenLoader