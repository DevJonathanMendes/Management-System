export type Seller = {
  username: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  sellerId: string;
  updated: Date;
  created: Date;
};
