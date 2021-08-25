const fetch = require('node-fetch');

const BASE_URL = "http://127.0.0.1:8080"
const AUTH_KEY = ""

const getMe = () => {
	return fetch(`${BASE_URL}/me?token=${AUTH_KEY}`)
		.then(res => res.json())
}

const getStatus = (id) => {
	return fetch(`${BASE_URL}/status/${id}`)
		.then(res => res.json())
}

const getTree = (id) => {
	return fetch(`${BASE_URL}/tree/${id}?token=${AUTH_KEY}`)
		.then(res => res.json())
}

const sendTweet = (params) => {
	const url = `http://127.0.0.1:8080/tweet?status=${params.text}&repliedTo=${params.to}&type=${params.type}&token=${AUTH_KEY}`
	return fetch(url).then(res => res.json())
}

export default {
	getMe,
	getStatus,
	getTree,
	sendTweet
};
