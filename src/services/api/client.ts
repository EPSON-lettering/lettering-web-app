import axios, { HttpStatusCode } from 'axios';
import { BroadcastChannel } from "broadcast-channel";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;


const unAuthroizedAlertChannel = new BroadcastChannel('UNAUTH');

export const jsonClient = axios.create({
	baseURL: serverUrl,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
	},
});


jsonClient.interceptors.request.use((req) => {
	const token = localStorage.getItem("access");
	if (!token) return req;
	req.headers["Authorization"] = `Bearer ${token}`;
	return req;
});

jsonClient.interceptors.response.use(
		(res) => res.data,
		(err) => {
			const statusCode = err.response.status as number;
			if (statusCode === HttpStatusCode.Unauthorized) {
				unAuthroizedAlertChannel.postMessage('UNAUTH');
			}
			if (statusCode === 401) {
				localStorage.removeItem('access');
				localStorage.removeItem('refresh');
				localStorage.removeItem('user-store');
				location.href = '/';
			}
			return Promise.reject({ ...err.response.data, code: statusCode });
		},
);
