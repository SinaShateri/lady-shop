/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ name: 'phoneOrEmail', async: false })
export class PhoneOrEmailValidation implements ValidatorConstraintInterface {
  validate(phoneOrEmail: string, args: ValidationArguments) {
    const phoneRegex = /^09\d{9}$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return phoneRegex.test(phoneOrEmail) || emailRegex.test(phoneOrEmail);
  }

  defaultMessage(args: ValidationArguments) {
    return 'شماره موبایل یا ایمیل نادرست است.';
  }
}
