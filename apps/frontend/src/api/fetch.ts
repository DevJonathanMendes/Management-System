// import { ICustomer } from "../interfaces/ICustomer";

const BASE_URL = "http://localhost:3500/auth/";

const API = async (path: string, data: any) => {
  const res = await fetch(BASE_URL + path, {
    body: JSON.stringify(data),
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  // const json: { username: string; token: string } = await res.json();
  const json = await res.json();
  // Here you would usually send a request to your backend to authenticate the user
  // For the sake of this example, we're using a mock authentication
  if (json?.token) {
    // Replace with actual authentication logic
    return true;
  }

  console.error("Invalid username or password");
};

export default API;
