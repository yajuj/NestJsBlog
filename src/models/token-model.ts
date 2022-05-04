import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({
    required: true,
  })
  refresh_token: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
