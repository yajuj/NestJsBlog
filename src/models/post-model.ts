import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

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

export type PostDocument = Post;

export const PostSchema = SchemaFactory.createForClass(Post);
