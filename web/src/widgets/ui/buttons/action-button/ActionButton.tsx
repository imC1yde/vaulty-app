import BaseButton, { type IBaseButtonProps } from '@src/widgets/ui/buttons/action-button/BaseButton.tsx'
import type { FC } from 'react'

const Primary: FC<IBaseButtonProps> = (props) => (
  <BaseButton
    {...props}
    variantClasses="bg-accent/80 border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
    glowClass="border-blue-400"
  />
)

const Danger: FC<IBaseButtonProps> = (props) => (
  <BaseButton
    {...props}
    variantClasses="bg-danger/80 border-red-400 shadow-[0_0_15px_rgba(220,38,38,0.2)]"
    glowClass="border-red-400"
  />
)

const Neon: FC<IBaseButtonProps> = (props) => (
  <BaseButton
    {...props}
    variantClasses="bg-indigo-600/20 border-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.3)] hover:bg-indigo-600/40"
    glowClass="border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
  />
)

const ActionButton = Object.assign(Primary, {
  Primary,
  Danger,
  Neon
})

export default ActionButton