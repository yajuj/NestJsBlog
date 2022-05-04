import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from 'src/models/user-model';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { Token, TokenSchema } from 'src/models/token-model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
