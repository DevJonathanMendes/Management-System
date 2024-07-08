import { Seller } from "../types/Seller";

class APISeller {
  constructor() {}

  private API_URL = "http://localhost:3500/sellers";

  async signin(data: Seller | null = null) {
    return this.post("signin", data);
  }

  async signup(data: Seller | null = null) {
    return this.post("signup", data);
  }

  private async post(path: string, data: Seller | null = null) {
    const res = await fetch(`${this.API_URL}/${path}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(3000),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  }

  async get(token: string) {
    const res = await fetch(this.API_URL, {
      method: "GET",
      mode: "cors",
      signal: AbortSignal.timeout(3000),
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  }
}

export default new APISeller() as APISeller;
