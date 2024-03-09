import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { TransformDataPipe } from 'src/customers/customers.pipe';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

@Controller('customers')
@UsePipes(new TransformDataPipe())
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Post()
  async create(@Body() data: CreateCustomerDto) {
    const { email } = data;
    const customer = await this.customersService.findOneByEmail(email);

    if (customer) throw new BadRequestException(['email already exists']);

    return this.customersService.create(data);
  }

  @Get()
  findAll(): Promise<CustomerEntity[]> {
    return this.customersService.findAll();
  }

  @Get('email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.customersService.findOneByEmail(email);
  }

  @Get('name/:name')
  findOneByName(@Param('name') name: string) {
    return this.customersService.findAnyByName(name);
  }
}
