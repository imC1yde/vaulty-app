import {
  isStrongPassword,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

const PASSWORD_SETTINGS = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  maxLength: 32
}

@ValidatorConstraint({ name: 'Password', async: false })
class PasswordConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return typeof value === 'string' && isStrongPassword(value, PASSWORD_SETTINGS)
  }

  defaultMessage() {
    return 'Пароль слишком уязвим'
  }
}

export const Password = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isAppPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: PasswordConstraint
    })
  }
}