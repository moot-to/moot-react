import React, {useState, useEffect} from 'react';
import API from '../utils/api'
import { AccountContext } from '../App';
import { Handle } from 'react-flow-renderer';
import Tweet from './Tweet'
import TweetReply from './TweetReply'
import '../styles/node.css';

const Node = (param) => {
	const [status, setStatus] = useState()
	const [loading, setLoading] = useState(true)
	const [visibleReplyForm, setVisibleReplyForm] = useState(false);

	const refetchStatus = () => {
		API.getStatus(param.data.id).then(setStatus).then(() => setLoading(false))
	}

	const likeTweet = () => {
		API.likeTweet(param.data.id).then(res => {
			if(res.id){
				setStatus({...status, favorited: true, favorite_count: status.favorite_count + 1})
			}
		})
	}

	const dislikeTweet = () => {
		API.dislikeTweet(param.data.id).then(res => {
			if(res.id){
				setStatus({...status, favorited: false, favorite_count: status.favorite_count - 1})
			}
		})
	}

	useEffect(() => {
		API.getStatus(param.data.id).then(setStatus).then(() => setLoading(false))
	}, [])

	const types = [
		{value: "0", text: "çünkü", id: 'value-0', desc: "desteklemek için"},
		{value: "1", text: "ama", id: 'value-1', desc: "karşı argüman sunmak için"},
		{value: "2", text: "ayrıca", id: 'value-2', desc: "ek bilgi sağlamak için"}
	]

  return <AccountContext.Consumer>
		{((me) => (
			<div className={`node node-type-${param.data.type || "n"}`}>
				<div className="node-label">{param.data && param.data.type && <span className={`node-type-text node-type-${param.data.type || "n"}`}>{types.find(type => type.value === param.data.type).text}</span>}</div>
				{param.data.type !== null && <Handle type="target" position="top" style={{ background: '#555', visibility: 'hidden' }} isConnectable={true} />}
				<Tweet className={`tweet-type-${param.data.type || "n"}`}
					like={(e) => {e.preventDefault(); likeTweet()}}
					dislike={(e) => {e.preventDefault(); dislikeTweet()}}
					reply={(e) => {e.preventDefault(); setVisibleReplyForm(!visibleReplyForm)}}
					loading={loading} status={status} />
				{visibleReplyForm && <TweetReply me={me} refetch={() => {param.data.refetch(); setVisibleReplyForm(false) }} screen_name={status && status.user.screen_name} to={param.data.id} /> }
				<Handle type="source" position="bottom" style={{ background: '#555', visibility: 'hidden' }} isConnectable={true} />
			</div>))}
	</AccountContext.Consumer>
}

export default Node;
