import axios from 'axios';

export const jsonClient = axios.create({
	url: 'http://galaxy4276.asuscomm.com:8000',
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
	},
});
