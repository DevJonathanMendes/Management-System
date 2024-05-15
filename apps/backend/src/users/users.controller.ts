import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto): Promise<UserEntity> {
    const { username, email } = data;
    const partners = await this.userService.findAny({ username }, { email });

    const message: string[] = [];
    partners.forEach((user) => {
      if (user.username === username) message.push('username already exists');
      if (user.email === email) message.push('email already exists');
    });

    if (message.length > 0) {
      throw new BadRequestException(message);
    }

    return this.userService.create(data);
  }

  @Get('username/:username')
  findUnique(@Param('username') value: string): Promise<UserEntity> {
    return this.userService.findUnique(value);
  }

  /* @Get()
  findAll(): Promise<UserEntity[]> {
    return this.service.findAll();
  } */
}
