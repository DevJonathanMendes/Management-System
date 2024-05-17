import { Sellers } from '@prisma/client';

export class SellerEntity implements Sellers {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  updated: Date;
  created: Date;
}
