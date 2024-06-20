import { Sellers } from '@prisma/client';

export class SellerEntity implements Sellers {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  updated: Date;
  created: Date;
}
