import axios from 'axios';

const baseURL = 'https://api.nekosapi.com/v4/';

export const api = axios.create({
	baseURL,
	timeout: 5000
});
