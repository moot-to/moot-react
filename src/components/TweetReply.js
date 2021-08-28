import React, { useState } from 'react';
import '../styles/tweetreply.css';
import API from '../utils/api'

const TweetReply = (props) => {
	const [_type, setType] = useState();
	const [text, setText] = useState("");

	const [showFallacies, setShowFallacies] = useState(false);
	const [fallacyId, setFallacyId] = useState(null);

	const types = [
		{value: "0", text: "çünkü", id: 'value-0', desc: "desteklemek için"},
		{value: "1", text: "ama", id: 'value-1', desc: "karşı argüman sunmak için"},
		{value: "2", text: "ayrıca", id: 'value-2', desc: "ek bilgi sağlamak için"},
		{value: "3", text: "safsata", id: 'value-3', desc: "mantık hatası bildirmek için"}
	]

	const change = ({target: {value}}) => {
		setType(value);

		if(value === '3') {
			setShowFallacies(true)
		}else{
			setText(types.find(type => type.value === value).text + " ");
			setShowFallacies(false)
		}
		document.querySelector("textarea").focus()
	}

	const fallacyChange = ({target: {value}}) => {
		setFallacyId(Number(value))
		setText(props.fallacies.find(type => type.id === Number(value)).name + " ");
		document.querySelector("textarea").focus()
	}

	const url_match_regex = /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi;
	const links = text.match(url_match_regex);
	const text_length = links && links.length ? text.replace(url_match_regex, "").length + (links.length * 23 ) : text.length;

	if(Boolean(props.me.error)){
		return <div className="tweet tweet-reply">
			Tweet göndermek için <a href={`${API.BASE_URL}/sessions/connect`} style={{color: "#2f7af4"}}>giriş</a> yapınız.
		</div>
	}

	return <div className="tweet tweet-reply">
		<div className="form">
			{ types.map(type => (<div key={type.value}>
				<input checked={_type === type.value} type="radio" id={type.id} name="type" value={type.value} onChange={change} />
				<label htmlFor={type.id}><span className={type.id}>{type.text}</span> ― <i>{type.desc}</i></label><br />
			</div>)) }

			{showFallacies && <p className="fallacy-readme">Uygun safsatayı seçerek bir açıklama girebilirsiniz. Safsataların açıklamarı için seçeneklerin yanında bulunan bağlantıları kullanabilirsiniz.</p>}
			<div className="fallacies">
				{ showFallacies && props.fallacies.map(fallacy => (
					<div key={fallacy.id}>
						<input className="fallacy-input" checked={fallacyId === fallacy.id} type="radio" id={`value-fallacy-${fallacy.id}`} name="fallacy-type" value={fallacy.id} onChange={fallacyChange} />
						<label htmlFor={`value-fallacy-${fallacy.id}`}><span className={fallacy.id}>
							{fallacy.name} <a href={fallacy.source.tr} target="_blank"><i className="fas fa-external-link-alt"></i></a>
						</span></label><br />
					</div>
				))}
			</div>

			<textarea style={text_length > 240 ? {border: "2px solid #E80F0C"} : {}} disabled={!Boolean(_type) || (showFallacies === true && fallacyId === null)} value={text} onChange={({target: {value}}) => setText(value) }></textarea>
			<div className="buttons">
				<button disabled={text_length > 240 || !Boolean(_type) || (showFallacies === true && fallacyId === null)} className="send-button" onClick={() => {
					if(Boolean(text) === false || Boolean(_type) === false){
						return alert('argüman tipi seçmelisin');
					}
					API.sendTweet({text: `@${props.screen_name} ${text}`, type: _type, fallacyId, to: props.to})
						.then(() => props.refetch())
				}}><span className="char-limit" style={{color: text_length > 240 ? '#e80f0c' : 'inherit'}}>({text_length}/240)</span> ekle</button>
			</div>
		</div>
	</div>
}

export default TweetReply;
