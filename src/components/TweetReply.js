import React, { useState } from 'react';
import '../styles/tweetreply.css';
import API from '../utils/api'

const TweetReply = (props) => {
	const [_type, setType] = useState();
	const [text, setText] = useState();

	const types = [
		{value: "0", text: "çünkü", id: 'value-0', desc: "desteklemek için"},
		{value: "1", text: "ama", id: 'value-1', desc: "karşı argüman sunmak için"},
		{value: "2", text: "ayrıca", id: 'value-2', desc: "ek bilgi sağlamak için"}
	]

	const change = ({target: {value}}) => {
		setText(types.find(type => type.value === value).text + " "); setType(value);
		document.querySelector("textarea").focus()
	}

	return <div className="tweet">
		<div className="form">
			{ types.map(type => (<>
				<input checked={_type === type.value} type="radio" id={type.id} name="type" value={type.value} onChange={change} />
				<label htmlFor={type.id}><span className={type.id}>{type.text}</span> ― <i>{type.desc}</i></label><br />
			</>)) }

			<textarea value={text} onChange={({target: {value}}) => setText(value) }></textarea>

			<button onClick={() => {
				if(Boolean(text) === false || Boolean(_type) === false){
					return alert('argüman tipi seçmelisin');
				}
				API.sendTweet({text: `@${props.screen_name} ${text}`, type: _type, to: props.to})
					.then(() => props.refetch())
			}}>ekle</button>
		</div>
	</div>
}

export default TweetReply;
