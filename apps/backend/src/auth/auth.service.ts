import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';

import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(data) {
    const user = await this.usersService.findUnique(data.username);

    if (user?.password !== this.passwordHash(data.password)) {
      throw new UnauthorizedException(
        'User does not exist or password is incorrect',
      );
    }

    const payload = { username: user.username, sub: user.id };

    return {
      username: data.username,
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(data: CreateUserDto) {
    data.password = this.passwordHash(data.password);
    const newUser = await this.usersService.create(data);
    const { username, password } = newUser;

    return {
      username,
      token: this.jwtService.sign({
        username,
        password,
      }),
    };
  }

  private passwordHash(password: string) {
    return createHash('sha256')
      .update(password + process.env.JWT_SECRET)
      .digest('hex');
  }
}
