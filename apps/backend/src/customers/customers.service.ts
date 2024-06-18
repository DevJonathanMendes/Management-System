import { ForbiddenException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCustomerDto) {
    return this.prisma.customers.create({ data });
  }

  update(id: string, data: UpdateCustomerDto) {
    return this.prisma.customers.update({
      where: { id },
      data,
    });
  }

  findManyWhere(seller_id: string) {
    return this.prisma.customers.findMany({ where: { seller_id } });
  }

  findUnique(id: string, seller_id: string): Promise<CustomerEntity> {
    return this.prisma.customers.findUnique({
      where: { id, AND: { seller_id } },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
