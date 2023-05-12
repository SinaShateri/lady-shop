import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
// import { Smsir } from 'sms-typescript/lib';
import * as bcrypt from 'bcrypt';
import { AuthenticateDto } from './dto/authenticate.dto';
import { OtpDto } from './dto/otp.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async authenticate(authenticateDto: AuthenticateDto) {
    const user = await this.usersRepository.findUserByPhoneOrEmail(
      authenticateDto.phoneOrEmail,
    );
    const isPhone = /^09\d{9}$/.test(authenticateDto.phoneOrEmail);
    if (!isPhone) {
      return {
        status: HttpStatus.OK,
        data: {
          login_with_email: true,
          is_otp_sent: false,
          has_account: !!user,
        },
      };
    }
    const isOtpSent = await this.sendOtpMessage(authenticateDto.phoneOrEmail);
    return {
      status: HttpStatus.OK,
      data: {
        login_with_email: false,
        is_otp_sent: isOtpSent,
        has_account: !!user,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async sendOtpMessage(phone: string) {
    if (!process.env.SMS_API_KEY || !process.env.SMS_LINE_NUMBER) {
      throw new InternalServerErrorException(
        'خطایی غیر منتظره در سرور رخ داده است.',
      );
    }
    // const sms = new Smsir(
    //   process.env.SMS_API_KEY,
    //   Number(process.env.SMS_LINE_NUMBER),
    // );
    // eslint-disable-next-line no-mixed-operators
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const hashedCode = await bcrypt.hash(String(randomCode), 12);
    console.log(randomCode);
    await this.usersRepository.saveOtp(phone, hashedCode);
    return true;
    // const response = await sms.SendVerifyCode(phone, 100000, [
    //   {
    //     name: 'CODE',
    //     value: String(randomCode),
    //   },
    // ]);
    // return response.status === 200;
  }

  async verifyOtp(otpDto: OtpDto) {
    const otp = await this.usersRepository.findOtpByPhone(otpDto.phone);
    if (!otp) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: {
          message:
            'کدی برای شماره وارد شده ارسال نشده است. لطفا دوباره تلاش کنید.',
        },
      };
    }

    if (otp.expireTime < new Date()) {
      await this.usersRepository.removeAllOtpByPhone(otpDto.phone);
      return {
        status: HttpStatus.UNAUTHORIZED,
        data: {
          message: 'کد وارد شده منقضی شده است.',
        },
      };
    }

    if (!(await bcrypt.compare(otpDto.code, otp.code)))
      return {
        status: HttpStatus.UNAUTHORIZED,
        data: {
          message: 'کد وارد شده صحیح نمی باشد.',
        },
      };

    // await this.usersRepository.removeAllOtpByPhone(otpDto.phone);
    return {
      status: HttpStatus.OK,
      data: {
        message: 'کد وارد شده صحیح می باشد.',
      },
    };
  }

  async findUserById(id: string) {
    return this.usersRepository.findUserById(id);
  }
}
