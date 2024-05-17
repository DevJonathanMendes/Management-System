import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';

import { CreateSellerDto } from '../sellers/dto/create-seller.dto';
import { UpdateSellerDto } from '../sellers/dto/update-seller.dto';
import { SellersService } from '../sellers/sellers.service';

@Injectable()
export class AuthService {
  constructor(
    private sellersService: SellersService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: UpdateSellerDto) {
    const seller = await this.sellersService.findUnique(data.username);

    if (seller?.password !== this.passwordHash(data.password)) {
      throw new UnauthorizedException([
        'Seller does not exist or password is incorrect',
      ]);
    }

    const payload = { username: seller.username, sub: seller.id };

    return {
      username: data.username,
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(data: CreateSellerDto) {
    data.password = this.passwordHash(data.password);
    const newSeller = await this.sellersService.create(data);
    const { username, password } = newSeller;

    return {
      username,
      token: this.jwtService.sign({
        username,
        password,
      }),
    };
  }

  private passwordHash(password: string) {
    return createHash('sha256')
      .update(password + process.env.JWT_SECRET)
      .digest('hex');
  }
}
