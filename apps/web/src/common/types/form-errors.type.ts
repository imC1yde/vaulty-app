import type { DeepRequired, FieldErrorsImpl, FieldValues, GlobalError } from 'react-hook-form'

export type FormErrors = Partial<FieldErrorsImpl<DeepRequired<FieldValues>>> & {
  root?: Record<string, GlobalError> & GlobalError
}