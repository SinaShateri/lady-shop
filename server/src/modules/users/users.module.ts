import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSerializer } from '../../common/utils/SessionSerializer';

import { OtpSchema } from './schemas/otp.schema';
import { UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'otp', schema: OtpSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, SessionSerializer],
})
export class UsersModule {}
