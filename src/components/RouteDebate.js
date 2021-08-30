import React, { useState, useEffect }  from 'react';
import API from '../utils/api'
import { useParams } from 'react-router-dom';

const RouteDebate = (props) => {
	const {id} = useParams();

	useEffect(() => {
		API.getUUIDStatus(id).then(res => {
			if(res.statusId){
				window.location = "/" + res.statusId;
			}
		})
	}, [])

	return <div>Redirecting...</div>
}

export default RouteDebate;
