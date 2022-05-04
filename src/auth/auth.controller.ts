import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateUserDto) {
    const userFromDb = this.authService.findOne({
      username: createAuthDto.username,
    });
    if (userFromDb) throw new ForbiddenException();

    this.authService.create(createAuthDto);
    return;
  }
}
