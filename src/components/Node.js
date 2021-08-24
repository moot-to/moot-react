import React, {useState, useEffect} from 'react';
import API from '../utils/api'
import { Handle } from 'react-flow-renderer';
import Tweet from './Tweet'

const customNodeStyles = {
	minWidth: 208,
	minHeight: 100,
	backgroundColor: "#fff"
};

const Node = (param) => {
	const [status, setStatus] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
			API.getStatus(param.data.id).then(setStatus).then(() => setLoading(false))
	}, [])

  return <div style={customNodeStyles}>
			<Handle type="source" position="top" style={{ background: '#555' }} isConnectable={true} />
			<Tweet loading={loading} status={status} />
			<Handle type="target" position="bottom" style={{ background: '#555' }} isConnectable={true} />
    </div>
}

export default Node;
