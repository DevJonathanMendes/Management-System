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
