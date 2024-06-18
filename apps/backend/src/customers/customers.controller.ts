import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';

import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  create(@Req() req, @Body() data: CreateCustomerDto) {
    // Para mais segurança, é bom adotar mais formas de verificar a autenticidade da requisição.
    data.seller_id = req.seller.id;
    return this.customersService.create({ ...data });
  }

  @Get()
  findAll(@Req() req) {
    return this.customersService.findManyWhere(req.seller.id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCustomerDto,
    @Req() req,
  ) {
    const customer = await this.customersService.findUnique(id, req.seller.id);

    if (!customer) {
      throw new UnauthorizedException(['Customer does not exist']);
    }

    return this.customersService.update(id, data);
  }

  /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  } */
}
