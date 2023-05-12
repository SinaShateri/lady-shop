import { Body, Controller, HttpCode, Post, Session } from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthenticateDto } from './dto/authenticate.dto';
import { OtpDto } from './dto/otp.dto';
import { UsersService } from './users.service';

@ApiTags('Authentication')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('authenticate')
  @ApiCookieAuth()
  @ApiResponse({
    status: 200,
    schema: {
      properties: {
        status: {
          type: 'number',
          example: 200,
        },
        data: {
          type: 'object',
          properties: {
            login_with_email: {
              type: 'boolean',
              example: true,
            },
            is_otp_sent: {
              type: 'boolean',
              example: true,
            },
            has_account: {
              type: 'boolean',
              example: true,
            },
          },
        },
      },
    },
  })
  async authenticate(@Body() authenticateDto: AuthenticateDto) {
    return await this.usersService.authenticate(authenticateDto);
  }

  @HttpCode(200)
  @Post('otp')
  async otp(@Body() otpDto: OtpDto, @Session() session: Record<string, any>) {
    console.log(session);
    session.isAuth = true;

    return await this.usersService.verifyOtp(otpDto);
  }
}
