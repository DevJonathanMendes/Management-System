import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isPhoneNumber,
  isMobilePhone,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsPhone', async: false })
export class IsPhone implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return isPhoneNumber(text) || isMobilePhone(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'contact must be a valid number';
  }
}
