import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UpdateSellerDto } from '../sellers/dto/update-seller.dto';
import { SellerEntity } from '../sellers/entities/seller.entity';
import { UserToken } from './entities/toke.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signToken = (seller: Partial<SellerEntity>, data: UpdateSellerDto = null) => {
    if (data && data?.password !== seller.password) {
      throw new UnauthorizedException(['Incorrect password']);
    }

    return this.createPayload(seller);
  };

  private createPayload({ id, username }: Partial<SellerEntity>): UserToken {
    const payload = { id, username };

    return {
      ...payload,
      token: this.jwtService.sign({ ...payload }),
    };
  }
}
