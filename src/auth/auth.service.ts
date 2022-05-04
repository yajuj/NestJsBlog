import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user-model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.UserModel.create(createUserDto);
    return user;
  }

  async findOne(id: number) {
    const user = await this.UserModel.findOne({ _id: id });
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
