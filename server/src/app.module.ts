import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from './modules/users/users.module';

@Module({
  // modules
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/ecommerce',
    ),
    UsersModule,
    PassportModule.register({
      session: true,
    }),
  ],
  // controllers
  controllers: [],
  // services
  providers: [Logger],
})
export class AppModule {}
