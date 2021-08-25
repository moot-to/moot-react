import React, { useState, useEffect } from 'react';
import './styles/App.css'

import API from './utils/api'
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Debate } from './components'

const App = () => {
	const [me, setMe] = useState()

	useEffect(() => {
		API.getMe().then(setMe)
	}, [])


  return (
		<div className="App">
			<header>
				<div className="logo">moot.to</div>	
				<div id="signin">
					{ me && me.screen_name ? <span>{me.screen_name} ― <span style={{cursor: "pointer"}} onClick={API.logout}>çıkış yap</span></span> : <a href={`${API.BASE_URL}/sessions/connect`}>giriş yap</a>  }
				</div>
			</header>

			<BrowserRouter>
				<Route exact path="/"> <Home /> </Route>	
				<Route path="/:id"> <Debate /> </Route>	
			</BrowserRouter>	
		</div>
  );
};

export default App;
