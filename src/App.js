import React, { useState, useEffect } from 'react';
import './styles/App.css'
import { ReactFlowProvider } from 'react-flow-renderer';

import API from './utils/api'
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Debate, RouteDebate } from './components'

const AccountContext = React.createContext(null);
const App = () => {
	const [me, setMe] = useState(null)
	const [fallacies, setFallacies] = useState()

	useEffect(() => {
		API.getMe().then(setMe);
		API.getFallacies().then(setFallacies);
	}, [])

	const getRandom = () => {
		API.randomMoot().then(res => {
			window.location = `/${res.statusId}`
		})
	}

  return (
		<div className="App">
			<header>
				<div className="logo"><a href="/">moot.to</a></div>
				<div id="signin">
					{ me && me.screen_name 
					? <div className="profile">
						<div className="picture"><img src={me.profile_image_url_https} /></div>
						<div className="username">{me.screen_name}</div>
						<div class="dropdown-content">
							<a onClick={API.logout}>çıkış yap</a>
						</div>
					</div>
					: <a href={`${API.BASE_URL}/sessions/connect`}>giriş yap</a>  }
				</div>
			</header>
			<BrowserRouter>
				<Route exact path="/"> <Home me={me} /> </Route>	
				<Route path="/r/:id"> <RouteDebate /> </Route>	
				<Route path="/:id">
					<ReactFlowProvider>
						<AccountContext.Provider value={{me, fallacies}}>
							<Debate me={me} />
						</AccountContext.Provider>
					</ReactFlowProvider>
				</Route>	
			</BrowserRouter>	
		</div>
  );
};

export { AccountContext };
export default App;
