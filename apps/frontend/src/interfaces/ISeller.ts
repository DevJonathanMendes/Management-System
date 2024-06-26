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

export type UpdatedCustomer = {
  id: string;
  name?: string;
  email?: string;
  seller_id?: string;
  updated?: string;
  created?: string;
};
