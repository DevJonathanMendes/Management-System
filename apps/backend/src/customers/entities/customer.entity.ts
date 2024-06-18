import { Customers } from '@prisma/client';

export class CustomerEntity implements Customers {
  id: string;
  name: string;
  email: string;
  seller_id: string;
  updated: Date;
  created: Date;
}
