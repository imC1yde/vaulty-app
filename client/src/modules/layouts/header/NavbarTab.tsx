import { motion } from 'framer-motion'
import type { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface INavbarTabProps {
  readonly label: string
  readonly link: string
}

const NavbarTab: FC<INavbarTabProps> = (props) => {
  const currentRoute = useLocation().pathname
  console.log(currentRoute, props.link, currentRoute === props.link)

  return (
    <motion.div
      className="relative cursor-pointer py-2 group"
      initial="initial"
      whileHover="hover"
      animate="initial"
    >
      <Link
        className={twMerge("text-sm font-medium  group-hover:text-white transition-colors duration-300 uppercase",
          props.link === currentRoute ? 'text-secondary-text' : 'text-primary-text')}
        to={props.link}>
        {props.label}
      </Link>

      <motion.div
        variants={{
          initial: { scaleX: 0, opacity: 0 },
          hover: { scaleX: 1, opacity: 1 }
        }}
        transition={{ duration: 0.3, ease: "circOut" }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-main-glow to-transparent origin-center"
      />
    </motion.div>
  )
}

export default NavbarTab