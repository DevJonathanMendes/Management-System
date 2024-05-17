import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellerEntity } from './entities/seller.entity';

@Injectable()
export class SellersService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateSellerDto): Promise<SellerEntity> {
    return this.prisma.sellers.create({ data });
  }

  update(id: string, data: UpdateSellerDto): Promise<SellerEntity> {
    return this.prisma.sellers.update({ where: { id }, data });
  }

  findUnique(username: string): Promise<SellerEntity> {
    return this.prisma.sellers.findUnique({ where: { username } });
  }

  findAny(...data: Partial<CreateSellerDto>[]): Promise<SellerEntity[]> {
    return this.prisma.sellers.findMany({
      where: { OR: [...data] },
    });
  }

  findAll(): Promise<SellerEntity[]> {
    return this.prisma.sellers.findMany();
  }
}
