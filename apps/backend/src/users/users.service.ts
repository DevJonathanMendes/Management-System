import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUserDto): Promise<UserEntity> {
    return this.prisma.users.create({ data });
  }

  update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    return this.prisma.users.update({ where: { id }, data });
  }

  findUnique(username: string): Promise<UserEntity> {
    return this.prisma.users.findUnique({ where: { username } });
  }

  findAny(...data: Partial<CreateUserDto>[]): Promise<UserEntity[]> {
    return this.prisma.users.findMany({
      where: { OR: [...data] },
    });
  }

  /* findAll(): Promise<UserEntity[]> {
    return this.prisma.users.findMany();
  } */
}
