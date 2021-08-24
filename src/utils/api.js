const fetch = require('node-fetch');

const BASE_URL = "http://127.0.0.1:8080"
const AUTH_KEY = "1426739363623362562-hGo2SpdnpISwCavWl8C3O7aH4hKd57"

const getMe = () => {
	return fetch(`${BASE_URL}/me?token=${AUTH_KEY}`)
		.then(res => res.json())
}

const getStatus = (id) => {
	return fetch(`${BASE_URL}/status/${id}`)
		.then(res => res.json())
}

export default {
	getMe,
	getStatus
};
