import { Seller } from "../interfaces/ISeller";

const BASE_URL = "http://localhost:3500/";

const API = {
  post: async function (path: string, body: Seller | null = null) {
    const res = await fetch(BASE_URL + path, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(3000),
      body: JSON.stringify(body),
    });

    return await res.json();
  },

  get: async function (path: string, token: string) {
    const res = await fetch(BASE_URL + path, {
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
  },
};

export default API;
