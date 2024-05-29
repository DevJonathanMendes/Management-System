import { Customers } from '@prisma/client';

export class CustomerEntity implements Customers {
  id: string;
  name: string;
  email: string;
  phone: string;
  sellerId: string;
  updated: Date;
  created: Date;
}
