/* eslint-disable no-mixed-operators */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OtpDocument = HydratedDocument<Otp>;

@Schema({ timestamps: true, expireAfterSeconds: 10, expires: '10s' })
export class Otp {
  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  code: string;

  // expire new date + 3 minutes
  @Prop({ required: true })
  expireTime: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
