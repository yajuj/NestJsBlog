import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TokenService } from './token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post()
  async create(@Body() createAuthDto: CreateUserDto) {
    const userFromDb = this.authService.findOne({
      username: createAuthDto.username,
    });
    if (userFromDb) throw new ForbiddenException();

    const user = await this.authService.create(createAuthDto);

    const tokens = await this.tokenService.getTokens(
      user._id.toString(),
      user.username,
    );
    return;
  }
}
