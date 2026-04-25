import FieldCheckbox from '@src/widgets/ui/field/compound/FieldCheckbox.tsx'
import FieldError from '@src/widgets/ui/field/compound/FieldError.tsx'
import FieldFile from '@src/widgets/ui/field/compound/FieldFile.tsx'
import FieldInput from '@src/widgets/ui/field/compound/FieldInput.tsx'
import FieldLabel from '@src/widgets/ui/field/compound/FieldLabel.tsx'
import FieldOption from '@src/widgets/ui/field/compound/FieldOption.tsx'
import FieldRadioButton from '@src/widgets/ui/field/compound/FieldRadioButton.tsx'
import FieldRadioGroup from '@src/widgets/ui/field/compound/FieldRadioGroup.tsx'
import FieldSelect from '@src/widgets/ui/field/compound/FieldSelectGroup.tsx'
import FieldSlider from '@src/widgets/ui/field/compound/FieldSlider.tsx'
import FieldTextarea from '@src/widgets/ui/field/compound/FieldTextarea.tsx'
import type { FC, HTMLAttributes } from 'react'

interface IFieldRootProps extends HTMLAttributes<HTMLDivElement> {}

const FieldRoot: FC<IFieldRootProps> = ({ children, className }) => (
  <div className={`flex flex-col gap-1.5 w-full group ${className}`}>{children}</div>
)


const Field = Object.assign(FieldRoot, {
  Input: FieldInput,
  Label: FieldLabel,
  Error: FieldError,
  File: FieldFile,
  Textarea: FieldTextarea,
  Checkbox: FieldCheckbox,
  RadioGroup: FieldRadioGroup,
  RadioButton: FieldRadioButton,
  SelectGroup: FieldSelect,
  Slider: FieldSlider,
  Option: FieldOption
})

export default Field