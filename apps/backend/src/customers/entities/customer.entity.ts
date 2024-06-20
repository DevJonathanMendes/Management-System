import { Customers } from '@prisma/client';

export class CustomerEntity implements Customers {
  id: number;
  name: string;
  email: string;
  seller_id: number;
  updated: Date;
  created: Date;
}
