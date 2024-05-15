import { Users } from '@prisma/client';

export class UserEntity implements Users {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  updated: Date;
  created: Date;
}
