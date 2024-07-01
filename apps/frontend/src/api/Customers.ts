import { Customer, UpdatedCustomer } from "../interfaces/ISeller";

class APICustomer {
  constructor() {}

  private API_URL = "http://localhost:3500/customers";

  async create(body: Customer, token: String) {
    const res = await fetch(this.API_URL, {
      method: "POST",
      mode: "cors",
      signal: AbortSignal.timeout(3000),
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  }

  async read(token: string) {
    const res = await fetch(this.API_URL, {
      method: "GET",
      mode: "cors",
      signal: AbortSignal.timeout(3000),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  }

  async update(body: UpdatedCustomer, token: string) {
    delete body.created;
    delete body.updated;

    const res = await fetch(`${this.API_URL}/${body.id}`, {
      method: "PATCH",
      mode: "cors",
      signal: AbortSignal.timeout(3000),
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  }

  async delete(id: string, token: string) {
    const res = await fetch(`${this.API_URL}/${id}`, {
      method: "DELETE",
      mode: "cors",
      signal: AbortSignal.timeout(3000),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  }
}

export default new APICustomer() as APICustomer;
