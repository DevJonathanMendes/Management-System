import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { CreateSellerDto } from '../sellers/dto/create-seller.dto';
import { UpdateSellerDto } from '../sellers/dto/update-seller.dto';

import { SellersService } from '../sellers/sellers.service';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sellersService: SellersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() data: UpdateSellerDto) {
    return this.authService.signIn(data);
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

    return this.authService.signUp(data);
  }
}
