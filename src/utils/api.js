const fetch = require('node-fetch');

const BASE_URL = "http://127.0.0.1:8080"

const getMe = () => {
	return fetch(`${BASE_URL}/me`, { credentials: 'include' })
		.then(res => res.json())
}

const getStatus = (id) => {
	return fetch(`${BASE_URL}/status/${id}`, { credentials: 'include' })
		.then(res => res.json())
}

const getTree = (id) => {
	return fetch(`${BASE_URL}/tree/${id}`, { credentials: 'include' })
		.then(res => res.json())
}

const sendTweet = (params) => {
	const url = `http://127.0.0.1:8080/tweet?status=${params.text}&repliedTo=${params.to}&type=${params.type}`
	return fetch(url, { credentials: 'include' }).then(res => res.json())
}

const likeTweet = (id) => {
	const url = `http://127.0.0.1:8080/like/${id}`
	return fetch(url, { credentials: 'include' }).then(res => res.json())
}

const logout = () => {
	const url = `http://127.0.0.1:8080/logout`
	return fetch(url, { credentials: 'include' })
		.then(res => res.json())
		.then(res => window.location.reload())
}

export default {
	getMe,
	getStatus,
	getTree,
	sendTweet,
	likeTweet,
	logout
};
