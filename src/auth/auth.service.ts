import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user-model';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  create(createUserDto: UserDto) {
    return this.UserModel.create(createUserDto);
  }

  async findOne(username: string) {
    return this.UserModel.findOne({ username: username });
  }
}
