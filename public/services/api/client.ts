import axios from 'axios';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

console.log({ serverUrl })

export const jsonClient = axios.create({
	baseURL: serverUrl,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
	},
});



// jsonClient.interceptors.request.use((req) => {
// 	const token = localStorage.getItem("access-token")
// 	if (!token) return req
// 	req.headers["Authorization"] = `Bearer ${token}`
// 	return req
// })

jsonClient.interceptors.response.use(
		(res) => res.data,
		(err) => {
			return Promise.reject(err.response.data)
		},
);
