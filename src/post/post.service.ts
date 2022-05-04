import { ForbiddenException, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from 'src/models/post-model';
import { User, UserDocument } from 'src/models/user-model';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  create(
    createPostDto: CreatePostDto,
    id: string,
    username: string,
    photo?: string | undefined,
    video?: string | undefined,
  ) {
    return this.postModel.create({
      ...createPostDto,
      author: username,
      author_id: id,
      ...(photo ? { photo } : {}),
      ...(video ? { video } : {}),
    });
  }

  findAll() {
    return this.postModel.find({});
  }

  findOne(id: string) {
    return this.postModel.findById(id);
  }

  update(
    id: string,
    updatePostDto: UpdatePostDto,
    photo: string | undefined,
    video: string | undefined,
  ) {
    return this.postModel.findOneAndUpdate(
      { _id: id },
      {
        ...updatePostDto,
        ...(photo ? { photo } : {}),
        ...(video ? { video } : {}),
      },
    );
  }

  remove(id: string) {
    return this.postModel.remove({ _id: id });
  }
}
