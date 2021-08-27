const fetch = require('node-fetch');

const BASE_URL = process.env.NODE_ENV === "production"
	? "https://api.moot.to"
	: "http://127.0.0.1:8080";

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
	const url = `${BASE_URL}/tweet?status=${btoa(unescape(encodeURIComponent(params.text)))}&repliedTo=${params.to}&type=${params.type}`
	return fetch(url, { credentials: 'include' }).then(res => res.json())
}

const likeTweet = (id) => {
	const url = `${BASE_URL}/like/${id}`
	return fetch(url, { credentials: 'include' }).then(res => res.json())
}

const dislikeTweet = (id) => {
	const url = `${BASE_URL}/dislike/${id}`
	return fetch(url, { credentials: 'include' }).then(res => res.json())
}

const randomMoot = (id) => {
	const url = `${BASE_URL}/random`
	return fetch(url, { credentials: 'include' }).then(res => res.json())
}

const logout = () => {
	const url = `${BASE_URL}/logout`
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
	dislikeTweet,
	randomMoot,
	logout
};
