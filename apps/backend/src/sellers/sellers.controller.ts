import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellersService } from './sellers.service';

import { AuthService } from '../auth/auth.service';
import { Public } from '../auth/decorators/public.decorator';

@Public()
@Controller('sellers')
export class SellersController {
  constructor(
    private sellersService: SellersService,
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() data: UpdateSellerDto) {
    const seller = await this.sellersService.findUniqueByUsername(data);

    if (!seller) {
      throw new BadRequestException(['Seller does not exist']);
    }

    return this.authService.signToken(seller, data);
  }

  @Post('signup')
  async signUp(@Body() data: CreateSellerDto) {
    const { username, email } = data;
    const partners = await this.sellersService.findAny({ username }, { email });

    const message: string[] = [];
    partners.forEach((seller) => {
      if (seller.username === username) message.push('username already exists');
      if (seller.email === email) message.push('email already exists');
    });

    if (message.length > 0) {
      throw new BadRequestException(message);
    }

    const newSeller = await this.sellersService.create(data);

    return this.authService.signToken(newSeller);
  }
}
