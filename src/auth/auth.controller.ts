import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { TokenService } from './token.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { RequestWithMetadata } from 'src/types/request-with-metadata';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('signup')
  async create(@Body() createAuthDto: UserDto) {
    const userFromDb = await this.authService.findOne(createAuthDto.username);

    if (userFromDb)
      throw new BadRequestException(
        `Пользователь с таким ${createAuthDto.username} уже существует.`,
      );

    const hash = await bcrypt.hash(createAuthDto.password, 10);
    const user = await this.authService.create({
      username: createAuthDto.username,
      password: hash,
    });

    const tokens = await this.tokenService.getTokens(
      user._id.toString(),
      user.username,
    );

    await this.tokenService.saveToken(
      user._id.toString(),
      tokens.refresh_token,
    );

    return tokens;
  }

  @Post('signin')
  async find(@Body() authDto: UserDto) {
    const user = await this.authService.findOne(authDto.username);
    if (!user)
      throw new BadRequestException('Неправильный username или password.');

    const hash = await bcrypt.compare(authDto.password, user.password);
    if (!hash)
      throw new BadRequestException('Неправильный username или password.');

    const tokens = await this.tokenService.getTokens(
      user._id.toString(),
      user.username,
    );

    await this.tokenService.saveToken(
      user._id.toString(),
      tokens.refresh_token,
    );

    return tokens;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Body() @Req() req: RequestWithMetadata) {
    const { id } = req.user;
    await this.tokenService.removeToken(id);
    return;
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refreshTokens(@Req() req: RequestWithMetadata) {
    const { id, username, token } = req.user;
    const tokens = await this.tokenService.refreshTokens(id, token, username);
    return tokens;
  }
}
