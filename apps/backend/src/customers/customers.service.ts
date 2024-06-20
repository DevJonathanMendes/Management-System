import { Injectable } from '@nestjs/common';
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

  update(id: number, data: UpdateCustomerDto) {
    return this.prisma.customers.update({
      where: { id },
      data,
    });
  }

  findManyWhere(seller_id: number) {
    return this.prisma.customers.findMany({ where: { seller_id } });
  }

  findUnique(id: number, seller_id: number): Promise<CustomerEntity> {
    return this.prisma.customers.findUnique({
      where: { id, seller_id },
    });
  }

  remove(id: number, seller_id: number) {
    return this.prisma.customers.delete({ where: { id, seller_id } });
  }
}
