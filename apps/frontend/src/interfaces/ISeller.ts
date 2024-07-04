export type Seller = {
  name?: string;
  username: string;
  email?: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  seller_id: string;
  updated: string;
  created: string;
};

export type CreateCustomer = {
  name: string;
  email: string;
  seller_id: string;
};

export type UpdateCustomer = {
  id: string;
  name?: string;
  email?: string;
  seller_id?: string;
  updated?: string;
  created?: string;
};
