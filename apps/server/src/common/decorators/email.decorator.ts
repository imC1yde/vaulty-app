import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

@ValidatorConstraint({ name: 'Email', async: false })
class EmailConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return typeof value === 'string' && EMAIL_REGEX.test(value)
  }

  defaultMessage() {
    return 'Email format is invalid'
  }
}

export const Email = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailConstraint
    })
  }
}