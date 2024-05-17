import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { CreateSellerDto } from './dto/create-seller.dto';
import { SellerEntity } from './entities/seller.entity';
import { SellersService } from './sellers.service';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellerService: SellersService) {}

  @Post()
  async create(@Body() data: CreateSellerDto): Promise<SellerEntity> {
    const { username, email } = data;
    const partners = await this.sellerService.findAny({ username }, { email });

    const message: string[] = [];
    partners.forEach((seller) => {
      if (seller.username === username) message.push('username already exists');
      if (seller.email === email) message.push('email already exists');
    });

    if (message.length > 0) {
      throw new BadRequestException(message);
    }

    return this.sellerService.create(data);
  }

  @Get('username/:username')
  findUnique(@Param('username') value: string): Promise<SellerEntity> {
    return this.sellerService.findUnique(value);
  }

  @Get()
  findAll(): Promise<SellerEntity[]> {
    return this.sellerService.findAll();
  }
}
