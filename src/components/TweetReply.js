import React, { useState } from 'react';
import '../styles/tweetreply.css';
import API from '../utils/api'

const TweetReply = (props) => {
	const [_type, setType] = useState();
	const [text, setText] = useState("");

	const types = [
		{value: "0", text: "çünkü", id: 'value-0', desc: "desteklemek için"},
		{value: "1", text: "ama", id: 'value-1', desc: "karşı argüman sunmak için"},
		{value: "2", text: "ayrıca", id: 'value-2', desc: "ek bilgi sağlamak için"}
	]

	const change = ({target: {value}}) => {
		setText(types.find(type => type.value === value).text + " "); setType(value);
		document.querySelector("textarea").focus()
	}

	const url_match_regex = /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi;
	const links = text.match(url_match_regex);
	const text_length = links && links.length ? text.replace(url_match_regex, "").length + (links.length * 23 ) : text.length;

	return <div className="tweet">
		<div className="form">
			{ types.map(type => (<>
				<input checked={_type === type.value} type="radio" id={type.id} name="type" value={type.value} onChange={change} />
				<label htmlFor={type.id}><span className={type.id}>{type.text}</span> ― <i>{type.desc}</i></label><br />
			</>)) }

			<textarea style={text_length > 240 ? {border: "2px solid #E80F0C"} : {}} disabled={!Boolean(_type)} value={text} onChange={({target: {value}}) => setText(value) }></textarea>
			<div className="buttons">
				<button disabled={text_length > 240 || !Boolean(_type)} className="send-button" onClick={() => {
					if(Boolean(text) === false || Boolean(_type) === false){
						return alert('argüman tipi seçmelisin');
					}
					API.sendTweet({text: `@${props.screen_name} ${text}`, type: _type, to: props.to})
						.then(() => props.refetch())
				}}><span className="char-limit" style={{color: text_length > 240 ? '#e80f0c' : 'inherit'}}>({text_length}/240)</span> ekle</button>
			</div>
		</div>
	</div>
}

export default TweetReply;
