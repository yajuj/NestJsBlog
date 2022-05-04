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

  async getTokens(userId: number, username: string): Promise<Tokens> {
    const [refresh_token, access_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        { secret: 'rt-key', expiresIn: 60 * 60 * 24 * 7 },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: 'key',
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

  async removeToken(user_id: number) {
    await this.tokenModel.remove({ user_id });
    return;
  }

  async refreshTokens(
    user_id: number,
    refresh_token: string,
    username: string,
  ) {
    const data = await this.tokenModel.findOne({ user_id });
    if (!data || refresh_token !== data.refresh_token)
      return new UnauthorizedException();

    const tokens = await this.getTokens(user_id, username);

    await this.tokenModel.updateOne(
      { user_id },
      { refresh_token: tokens.refresh_token },
    );

    return tokens;
  }
}
