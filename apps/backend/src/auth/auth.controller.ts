import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() data: UpdateUserDto) {
    return this.authService.signIn(data);
  }

  @Post('signup')
  async signUp(@Body() data: CreateUserDto) {
    const { username, email } = data;
    const partners = await this.usersService.findAny({ username }, { email });

    const message: string[] = [];
    partners.forEach((user) => {
      if (user.username === username) message.push('username already exists');
      if (user.email === email) message.push('email already exists');
    });

    if (message.length > 0) {
      throw new BadRequestException(message);
    }

    return this.authService.signUp(data);
  }
}
