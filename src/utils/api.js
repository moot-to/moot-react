const fetch = require('node-fetch');

const BASE_URL = process.env.NODE_ENV !== "production"
	? "3.120.152.26:8080"
	: "127.0.0.1:8080"

const getMe = () => {
	return fetch(`http://${BASE_URL}/me`, { credentials: 'include' })
		.then(res => res.json())
}

const getStatus = (id) => {
	return fetch(`http://${BASE_URL}/status/${id}`, { credentials: 'include' })
		.then(res => res.json())
}

const getTree = (id) => {
	return fetch(`http://${BASE_URL}/tree/${id}`, { credentials: 'include' })
		.then(res => res.json())
}

const sendTweet = (params) => {
	const url = `http://${BASE_URL}/tweet?status=${params.text}&repliedTo=${params.to}&type=${params.type}`
	return fetch(url, { credentials: 'include' }).then(res => res.json())
}

const likeTweet = (id) => {
	const url = `http://${BASE_URL}/like/${id}`
	return fetch(url, { credentials: 'include' }).then(res => res.json())
}

const logout = () => {
	const url = `http://${BASE_URL}/logout`
	return fetch(url, { credentials: 'include' })
		.then(res => res.json())
		.then(res => window.location.reload())
}

export default {
	BASE_URL,
	getMe,
	getStatus,
	getTree,
	sendTweet,
	likeTweet,
	logout
};
