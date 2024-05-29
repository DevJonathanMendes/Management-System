import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UpdateSellerDto } from '../sellers/dto/update-seller.dto';
import { SellerEntity } from '../sellers/entities/seller.entity';

type IUserToken = {
  id: string;
  username: string;
  token: string;
};

interface SignToken {
  (seller: SellerEntity, data?: UpdateSellerDto): IUserToken;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signToken: SignToken = (seller, data = null) => {
    if (data)
      if (data.password !== seller.password) {
        throw new UnauthorizedException(['Incorrect password']);
      }

    return this.createPayload(seller);
  };

  private createPayload({ id, username }: SellerEntity): IUserToken {
    const payload = { id, username };

    return {
      ...payload,
      token: this.jwtService.sign({ ...payload }),
    };
  }
}
