import type { INestable } from '@src/common/interfaces/nestable.interface.ts'
import { motion } from 'framer-motion'
import type { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface INavbarTabProps extends INestable {
  readonly link: string
  readonly hideUnderline?: boolean
}

const NavbarTab: FC<INavbarTabProps> = (props) => {
  const currentRoute = useLocation().pathname

  return (
    <motion.div
      className="relative cursor-pointer group"
      initial="initial"
      whileHover="hover"
      animate="initial"
    >
      <Link
        className={twMerge(
          "block px-4 py-2 text-sm font-medium transition-colors duration-300 uppercase tracking-[0.15em]",
          props.link === currentRoute ? 'text-accent' : 'text-primary-text group-hover:text-white'
        )}
        to={props.link}
      >
        {props.children}
      </Link>

      {!props.hideUnderline && (
        <motion.div
          variants={{
            initial: { scaleX: 0, opacity: 0 },
            hover: { scaleX: 1, opacity: 1 }
          }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent origin-center pointer-events-none"
        />
      )}
    </motion.div>
  )
}
export default NavbarTab