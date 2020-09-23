
import React from 'react';
import { Link } from 'react-router-dom';
import DragonList from '../../components/Dragons/Dragons';
import UIButton from '../../components/UI/Button/Button';

const Dragons = () => {
	return (
		<>
			<header className='header-page'>
				<div className="container">
					<h1>Veja os Dragões já cadastrados</h1>
					<Link to="/create-dragon">
						<UIButton type="submit" theme="contained-red" className="submit-button" rounded>
							Criar novo Dragão
						</UIButton>
					</Link>
				</div>
			</header>
			<section id="dragonList" className="container">
				<DragonList />
			</section>
		</>
	);
};

export default Dragons;
