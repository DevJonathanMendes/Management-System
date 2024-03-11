import { ICustomer } from "../interfaces/ICustomer";

const BASE_URL = "http://localhost:3000/api/"

const api = {
	post: async (path: string, data: ICustomer) => {
		const res = await fetch(BASE_URL + path, {
			body: JSON.stringify(data),
			method: "POST",
			mode: "cors",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		return await res.json();
	},

	get: async (path: string) => {
		const res = await fetch(BASE_URL + path, {
			method: "GET",
			mode: "cors",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		return await res.json();
	},
};

export default api;