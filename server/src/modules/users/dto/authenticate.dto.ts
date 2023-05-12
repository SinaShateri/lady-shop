import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { PhoneOrEmailValidation } from 'src/validations/phone-or-email.validation';

export class AuthenticateDto {
  @ApiProperty({
    type: String,
    description: 'ایمیل یا شماره موبایل',
    example: '09123456789 یا example@gmail.com',
  })
  @Validate(PhoneOrEmailValidation)
  @IsNotEmpty({ message: 'مقدار ایمیل یا شماره موبایل خالی می‌باشد' })
  phoneOrEmail: string;
}
