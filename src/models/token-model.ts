import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Token {
  @Prop({
    required: true,
  })
  refresh_token: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id;
}

export type TokenDocument = Token;

export const TokenSchema = SchemaFactory.createForClass(Token);
