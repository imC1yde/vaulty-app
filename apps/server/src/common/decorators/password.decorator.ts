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
  minSymbols: 1
}

@ValidatorConstraint({ name: 'Password', async: false })
class PasswordConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return typeof value === 'string' && isStrongPassword(value, PASSWORD_SETTINGS);
  }

  defaultMessage() {
    return 'Password is too weak (8+ chars, incl. Upper, Lower, Num, Symbol)';
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