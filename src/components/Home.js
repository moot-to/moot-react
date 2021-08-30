import React, { useState, useEffect }  from 'react';
import '../styles/home.css'
import { TweetPreview, TweetCreate } from '../components';
import API from '../utils/api'

const Home = (props) => {
	const [statuses, setStatuses] = useState([]);

	useEffect(() => {
		API.mainStatuses().then(setStatuses)
	}, []);

	return <div className="home">
		<div className="last-moots">
			<div className="filters">
				<span className="active">en yeniler</span>
				<span>en iyiler</span>
			</div>
			{statuses.map((status, key) => <TweetPreview key={key} status={status} />)}
		</div>
		<div className="introduction">
			<div className="inner">
				<pre>
					moot (adj) ― open to discussion or debate; debatable; doubtful.<br />
					moot (n) ― an argument or discussion, especially of a hypothetical legal case.
				</pre>

				<p>Moot, <i>twitter</i> tabanlı argüman haritalama ve tartışma platformudur. </p>
				{ props.me && Boolean(props.me.error)
					? <a id="twitter-button" class="btn btn-social btn-twitter" href={`${API.BASE_URL}/sessions/connect`}>twitter ile giriş yap</a>
					: <TweetCreate />
				}
			</div>
		</div>
	</div>
}

export default Home;
