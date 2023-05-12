import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: Object, required: false })
  name: {
    first: string;
    last: string;
  };

  @Prop({ required: false })
  nationalId: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: Object, required: false })
  birthDay: {
    day: number;
    month: number;
    year: number;
  };

  @Prop({ required: false })
  password: string;

  @Prop({ required: true, default: 'user' })
  role: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: false })
  cart: string;

  @Prop({ required: false })
  orders: string;

  @Prop({ required: false })
  wishlist: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
