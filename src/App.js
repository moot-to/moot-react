import React, { useState, useEffect } from 'react';
import './styles/App.css'
import { ReactFlowProvider } from 'react-flow-renderer';

import API from './utils/api'
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Debate } from './components'

const AccountContext = React.createContext(null);
const App = () => {
	const [me, setMe] = useState()

	useEffect(() => {
		API.getMe().then(setMe)
	}, [])

	const getRandom = () => {
		API.randomMoot().then(res => {
			window.location = `/${res.statusId}`
		})
	}

  return (
		<div className="App">
			<header>
				<div className="logo">moot.to </div>
				<div className="random" onClick={getRandom}>random</div>
				<div id="signin">
					{ me && me.screen_name ? <span>{me.screen_name} ― <span style={{cursor: "pointer"}} onClick={API.logout}>çıkış yap</span></span> : <a href={`${API.BASE_URL}/sessions/connect`}>giriş yap</a>  }
				</div>
			</header>

			<BrowserRouter>
				<Route exact path="/"> <Home /> </Route>	
				<Route path="/:id">
					<ReactFlowProvider>
						<AccountContext.Provider value={me}>
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
