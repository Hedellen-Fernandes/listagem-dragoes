
import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

import setPageStyle from '../../components/Dragons/helpers/setPageStyle';
import ManipulateDragonComponent from '../../components/Dragons/ManipulateDragon';


const ManipulateDragon = () => {
	const location = useLocation();
	const params = useParams();
	const pageStyle = setPageStyle(location.pathname, params.id, params.readOnly);
	
	return (
		<div>
			<header className='header-page'>
				<div className="container">
					<h1>{ pageStyle.title }</h1>
				</div>
			</header>
			<section id="manipulateDragon" className="container">
				<div className="container-form">
					<ManipulateDragonComponent />
				</div>
			</section>
		</div>
	);
};

export default ManipulateDragon;
