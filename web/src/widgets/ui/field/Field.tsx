import type { INestable } from '@src/common/interfaces/nestable.interface.ts'
import FieldError from '@src/widgets/ui/field/FieldError.tsx'
import FieldFile from '@src/widgets/ui/field/FieldFile.tsx'
import FieldInput from '@src/widgets/ui/field/FieldInput.tsx'
import FieldLabel from '@src/widgets/ui/field/FieldLabel.tsx'
import FieldTextarea from '@src/widgets/ui/field/FieldTextarea.tsx'
import type { FC } from 'react'

interface IFieldRootProps extends INestable {
  className?: string
}

const FieldRoot: FC<IFieldRootProps> = ({ children, className }) => (
  <div className={`flex flex-col gap-1.5 w-full group ${className}`}>{children}</div>
)


const Field = Object.assign(FieldRoot, {
  Input: FieldInput,
  Label: FieldLabel,
  Error: FieldError,
  File: FieldFile,
  Textarea: FieldTextarea
})

export default Field