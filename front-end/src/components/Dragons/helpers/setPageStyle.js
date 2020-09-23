import dragonsCrud from '../DragonsCrud';

const pageStyleCreate = {
	title: 'Criar Dragão',
	onSubmit: changeMethodCrud,
}

const pageStyleEdit = {
	title: 'Editar Dragão',
	onSubmit: changeMethodCrud,
}

const pageStyleRead = {
	title: 'Visualizar Detalhes do Dragão',
	onSubmit: () => {},
}

function changeMethodCrud(id, values) {
	if (id)
		return dragonsCrud.update(id, values);

	return dragonsCrud.create(values);
}

export default function setPageStyle(pathName, dragonId, readOnly) {
	if (pathName === '/create-dragon')
		return pageStyleCreate;

	if (dragonId !== null && readOnly === 'false')
		return pageStyleEdit;

	return pageStyleRead;
}
