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
import { faker } from '@faker-js/faker/locale/pt_BR';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Post('fake')
  async createFake() {
    const fake: CreateCustomerDto = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      telephone: faker.phone.number(),
      coordinate_x: faker.number.int({ min: 1, max: 100000 }),
      coordinate_y: faker.number.int({ min: 1, max: 100000 })
    }

    return this.customersService.create(fake);
  }

  @Post()
  @UsePipes(new TransformDataPipe())
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

  @Get('calcPath')
  calcPath() {
    return 'calcPath';
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
