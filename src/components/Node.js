import React, {useState, useEffect} from 'react';
import API from '../utils/api'
import { Handle } from 'react-flow-renderer';
import Tweet from './Tweet'
import TweetReply from './TweetReply'

const customNodeStyles = {
	minWidth: 208,
	minHeight: 100,
	backgroundColor: "#fff"
};

const Node = (param) => {
	const [status, setStatus] = useState()
	const [loading, setLoading] = useState(true)
	const [visibleReplyForm, setVisibleReplyForm] = useState(false);

	useEffect(() => {
			API.getStatus(param.data.id).then(setStatus).then(() => setLoading(false))
	}, [])

  return <div style={customNodeStyles}>
			<Handle type="source" position="bottom" style={{ background: '#555' }} isConnectable={true} />
			<Tweet reply={() => setVisibleReplyForm(!visibleReplyForm)} loading={loading} status={status} />
			{visibleReplyForm && <TweetReply screen_name={status && status.user.screen_name} to={param.data.id} /> }
			<Handle type="target" position="top" style={{ background: '#555' }} isConnectable={true} />
    </div>
}

export default Node;
