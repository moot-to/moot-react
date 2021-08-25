import React from 'react';
import '../styles/tweet.css';
import ContentLoader from 'react-content-loader'
import { Link } from 'react-router-dom'

const Tweet = ({reply, loading, status}) => {
	if(loading){
		return <ContentLoader speed={1} width={208} height={100}
			viewBox="0 0 400 200" backgroundColor="#ffffff" foregroundColor="#e6e6e6"
			style={{paddingTop: 20, paddingLeft: 20}}>
			<rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
			<rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
			<circle cx="20" cy="20" r="20" /> 
			<rect x="0" y="85" rx="3" ry="3" width="380" height="6" /> 
			<rect x="0" y="70" rx="3" ry="3" width="380" height="6" /> 
			<circle cx="11" cy="121" r="11" /> 
			<circle cx="46" cy="121" r="11" /> 
			<circle cx="81" cy="121" r="11" /> 
			<rect x="0" y="55" rx="3" ry="3" width="380" height="6" />
		</ContentLoader>
	}
	if(status.error){
		return <div className="tweet">
			Deleted.
		</div>
	}
	return <div className="tweet">
		<div className="tweet-head">
			<div className="tweet-image">
				<img src={status.user.profile_image_url_https} alt="avatar" />
			</div>
			<div className="tweet-author">
				<div className="name">{status.user.name}</div>
				<div className="handle">@{status.user.screen_name}</div>
			</div>
		</div>
		<div className="tweet-body">
			<p id="tweet-text">{status.text}</p>
		</div>
		<div className="tweet-footer">
			 <div className="icons">
				 <i className="fas fa-reply" onClick={reply}></i>
				 <Link to={`/${status.id_str}`}><i className="fas fa-retweet"></i></Link>
				 <i className="fas fa-heart"></i>
			 </div>
		</div>
	</div>
}

export default Tweet;
