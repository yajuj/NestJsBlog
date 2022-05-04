import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({
    required: true,
  })
  message: string;

  @Prop()
  photo: string;

  @Prop()
  video: string;

  @Prop()
  author: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author_id;
}

export const PostSchema = SchemaFactory.createForClass(Post);
