import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


import dragonsCrud from './DragonsCrud';
import UIButton from '../UI/Button/Button';
import dynamicSort from '../../utils/DynamicSort';

function initialState() {
	return []
}

const Dragons = () => {
	const [dragons, setDragons] = useState(initialState);
	const history = useHistory();

	useEffect(() => {
		dragonsCrud.read().then(dragons => {
			dragons.sort(dynamicSort('name', 'asc'));
			setDragons(dragons)
		})
	}, []);


	function detailDragonRoute(dragonId, readOnly) {
		history.push(`/dragon/${dragonId}/${readOnly}`)
	}

	async function deleteDragon(dragonId, setDragons) {
		await dragonsCrud.delete(dragonId)
			.then(() => dragonsCrud.read())
			.then(dragons => setDragons(dragons));
	}

	return (
		<div className="table-responsive">
			<table>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Tipo</th>
						<th>Data de criação</th>
						<th className='actions'>Ações</th>
					</tr>
				</thead>
				<tbody>
					{dragons.length > 0 ? (
						dragons.map(dragon => (
							<tr key={dragon.id}>
								<td>{dragon.name}</td>
								<td>{dragon.type}</td>
								<td>{new Date(dragon.createdAt).toLocaleDateString('pt-BR')}</td>
								<td className='actions'>
									<UIButton type="submit" onClick={() => { detailDragonRoute(dragon.id, true) }} theme="contained-green" className="submit-button" rounded>
										Visualizar
									</UIButton>

									<UIButton type="submit" onClick={() => { detailDragonRoute(dragon.id, false) }} theme="contained-yellow" className="submit-button" rounded>
										Editar
									</UIButton>

									<UIButton type="submit" onClick={() => deleteDragon(dragon.id, setDragons)} theme="contained-red" className="submit-button" rounded>
										Excluir
									</UIButton>
								</td>
							</tr>
						))
					) : (
							<tr>
								<td colSpan={4}>Nenhum resultado encontrado.</td>
							</tr>
						)}
				</tbody>
			</table>
		</div>
	);
};

export default Dragons;








