import React, { useState } from 'react';
import '../styles/tweetcreate.css';
import '../styles/tweetreply.css';
import API from '../utils/api'

const TweetCreate = (props) => {
	const [text, setText] = useState("");

	const change = ({target: {value}}) => {
		document.querySelector("textarea").focus()
	}

	const url_match_regex = /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi;
	const links = text.match(url_match_regex);
	const text_length = links && links.length ? text.replace(url_match_regex, "").length + (links.length * 23 ) : text.length;

	return <div className="tweet-create">
		<div className="form">
			<textarea placeholder="Bir moot tweeti oluşturun ve gönderin" style={text_length > 240 ? {border: "2px solid #E80F0C"} : {}} value={text} onChange={({target: {value}}) => setText(value) }></textarea>
			<div className="buttons">
				<button disabled={text_length > 240} className="send-button" onClick={() => {
					API.sendMoot({text}).then(res => window.location = `/${window.location = res.id_str}`)
				}}><span className="char-limit" style={{color: text_length > 240 ? '#e80f0c' : 'inherit'}}>({text_length}/240)</span> ekle</button>
			</div>
		</div>
	</div>
}

export default TweetCreate;
