import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from 'src/models/token-model';
import { Tokens } from 'src/types/tokens';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private jwtService: JwtService,
  ) {}

  async getTokens(userId: string, username: string): Promise<Tokens> {
    const [refresh_token, access_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: 60 * 60 * 24 * 7 },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: 60 * 15,
        },
      ),
    ]);
    return { refresh_token, access_token };
  }

  async saveToken(user_id: number, refresh_token: string) {
    const tokenData = await this.tokenModel.findOne({ user_id });
    if (tokenData) {
      await this.tokenModel.updateOne({ user_id }, { refresh_token });
      return;
    }

    await this.tokenModel.create({
      user_id,
      refresh_token,
    });

    return;
  }

  async removeToken(user_id: string) {
    return this.tokenModel.remove({ user_id });
  }

  async refreshTokens(
    user_id: string,
    refresh_token: string,
    username: string,
  ) {
    const data = await this.tokenModel.findOne({ user_id });
    console.log(data.refresh_token == refresh_token, refresh_token);
    if (!data || refresh_token !== data.refresh_token)
      return new UnauthorizedException('Авторизуйтесь в системе!');

    const tokens = await this.getTokens(user_id, username);

    await this.tokenModel.updateOne(
      { user_id },
      { refresh_token: tokens.refresh_token },
    );

    return tokens;
  }
}
