import { Seller } from "../interfaces/ISeller";

const BASE_URL = "http://localhost:3500/";

const API = {
  post: async (path: string, body: Seller | null = null) => {
    const res = await fetch(BASE_URL + path, {
      body: JSON.stringify(body),
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    return json;
  },

  get: async (path: string, token: string) => {
    const res = await fetch(BASE_URL + path, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    return json;
  },
};

export default API;
