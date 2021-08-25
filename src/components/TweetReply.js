import React, { useState } from 'react';
import '../styles/tweetreply.css';
import API from '../utils/api'

const TweetReply = (props) => {
	const [type, setType] = useState();
	const [text, setText] = useState();

	return <div className="tweet">
		<div className="form">
			<input checked={type === "0"} type="radio" id="because" name="type" value="0" onChange={({target: {value}}) => setType(value)} />
			<label htmlFor="because"><span className="because">çünkü</span> ― <i>desteklemek için</i></label><br />

			<input checked={type === "1"} type="radio" id="but" name="type" value="1" onChange={({target: {value}}) => setType(value)} />
			<label htmlFor="but"><span className="but">ama</span> ― <i>karşı argüman sunmak için</i></label><br />

			<input checked={type === "2"} type="radio" id="however" name="type" value="2" onChange={({target: {value}}) => setType(value)} />
			<label htmlFor="however"><span className="however">ancak</span> ― <i>ek bilgi sağlamak için</i></label><br />

			<textarea value={text} onChange={({target: {value}}) => setText(value) }></textarea>

			<button onClick={() => {
				if(Boolean(text) === false || Boolean(type) === false){
					return alert('argüman tipi seçmelisin');
				}
				API.sendTweet({text: `@${props.screen_name} ${text}`, type, to: props.to})
					.then(() => window.location.reload())
			}}>ekle</button>
		</div>
	</div>
}

export default TweetReply;
