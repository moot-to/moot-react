import React, { useState, useEffect } from 'react';
import '../styles/tweet-preview.css';
import ContentLoader from 'react-content-loader'
import { Link } from 'react-router-dom'
import API from '../utils/api'

const TweetPreview = (props) => {
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState();

	useEffect(() => {
		API.getStatus(props.status.statusId).then(res => {
			setStatus(res);
			setLoading(false)
		})
	}, []);

	if(loading){
		return <div></div>
	}
	if(status.error === "Deleted"){
		return null;
	}

	const username_regex = /@[a-zA-Z0-9]*/g;
	const hashtag_regex = /#([a-zöçişğüÖÇŞÜĞA-Z0-9]*)/g;
	const mentioned_usernames = status && status.text ? status.text.match(username_regex) : []

	return <div className="tweet-preview-container">
		<a href={`https://twitter.com/${status.user.screen_name}/status/${status.id_str}`} target="_blank">
			<div className="tweet-preview">
				<div className="tweet-head">
					<div className="tweet-image">
						<a href={`https://twitter.com/${status.user.screen_name}`} target="_blank">
							<img src={status.user.profile_image_url_https} alt="avatar" />
						</a>
					</div>
					<div className="tweet-author">
						<div className="name">
							<a href={`https://twitter.com/${status.user.screen_name}`} target="_blank">{status.user.name}</a>
							{status.user.verified === true && <svg className="verified" viewBox="0 0 24 24" aria-label="Verified account"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>}
						</div>
						<div className="handle"><a href={`https://twitter.com/${status.user.screen_name}`} target="_blank">@{status.user.screen_name}</a></div>
					</div>
					<div className="tweet-logo">
						<svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
					</div>
				</div>
				<div className="tweet-body">
					<p className="tweet-text-mention">{mentioned_usernames && <div>Replying to <span>{mentioned_usernames.join("")}</span></div>}</p>
					<p className="tweet-text" dangerouslySetInnerHTML={{__html: status.text.replace(username_regex, "").trimStart().replace(hashtag_regex, '<a class="hashtag" href="https://twitter.com/hashtag/$1" target="_blank">#$1</a>')}}></p>
				</div>
			</div>
		</a>
	</div>
}

export default TweetPreview;
