import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OtpDocument } from './schemas/otp.schema';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    @InjectModel('otp') private readonly otpModel: Model<OtpDocument>,
  ) {}

  async findUserByPhoneOrEmail(phoneOrEmail: string) {
    return await this.userModel.findOne({
      $or: [{ phone: phoneOrEmail }, { email: phoneOrEmail }],
    });
  }

  async saveOtp(phone: string, code: string) {
    return await this.otpModel.create({
      phone,
      code,
      // eslint-disable-next-line no-mixed-operators
      expireTime: new Date(Date.now() + 3 * 60 * 1000),
    });
  }

  async findOtpByPhone(phone: string) {
    return await this.otpModel.findOne({ phone });
  }

  async removeAllOtpByPhone(phone: string) {
    return await this.otpModel.deleteMany({ phone });
  }

  async findUserById(id: string) {
    return await this.userModel.findById(id);
  }
}
