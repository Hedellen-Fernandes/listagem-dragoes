import React, { useEffect, useRef } from 'react';
import { useHistory, useParams, useLocation, Link } from 'react-router-dom';

import setPageStyle from './helpers/setPageStyle';
import dragonsCrud from './DragonsCrud';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '../Form/Input';
import prepareErrorMessages from '../Form/helpers/prepareErrors';

import UIButton from '../UI/Button/Button';

function initialState() {
	return {
		name: '',
		type: '',
		history: '',
	};
}

async function validateForm(data) {
	const schema = Yup.object().shape({
		name: Yup.string().required('O campo nome é obrigatório'),
		type: Yup.string().required('O campo tipo é obrigatório'),
		history: Yup.string().required('O campo História é obrigatório'),
	});

	return await schema.validate(data, { abortEarly: false });
}


const ManipulateDragon = () => {
	const formRef = useRef(null);
	const history = useHistory();
	const params = useParams();
	const location = useLocation();

	const pageStyle = setPageStyle(location.pathname, params.id, params.readOnly);

	useEffect(() => {

		if (params.id)
			dragonsCrud.get(params.id).then(dragons => {
				dragons.createdAt = new Date(dragons.createdAt).toLocaleDateString('pt-BR');
				formRef.current.setData(dragons)
			});
		else
			formRef.current.setData(initialState());

			
		}, []);
		
		async function onSubmit(data, { reset }) {
			try {
				await validateForm(data);
				
				pageStyle.onSubmit(params.id, data).then(dragons => {
					if (dragons) {
						reset();
						history.push('/dragons')
					}
				});
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errorMessages = prepareErrorMessages(err);
					formRef.current.setErrors(errorMessages);
				}
			}
		}
		
		return (
			<div className="form">

			<Link to="/dragons" className="back">Voltar para página anterior</Link>
			
			<h1 className="title">{pageStyle.title}</h1>

			<Form ref={formRef} onSubmit={onSubmit}>
				<div className="form-control">
					<label htmlFor="name">Nome</label>
					<Input name="name" disabled={(params.readOnly === 'true')} />
				</div>

				<div className="form-control">
					<label htmlFor="type">Tipo</label>
					<Input name="type" disabled={(params.readOnly === 'true')} />
				</div>

				<div className="form-control">
					<label htmlFor="history">História</label>
					<Input name="history" disabled={(params.readOnly === 'true')} />
				</div>
				
				{
					params.readOnly === 'true'
						?
						<div>
							<div className="form-control">
								<label htmlFor="createdAt">Data criação</label>
								<Input name="createdAt" disabled={(params.readOnly === 'true')} />
							</div>
							<Link to="/dragons">
								<UIButton theme="contained-green" className="submit-button" rounded>
									Voltar para início
									</UIButton>
							</Link>
						</div>
						:
						<UIButton type="submit" theme="contained-green" className="submit-button" rounded>
							Salvar
						</UIButton>
				}
			</Form>
		</div>
	);
};

export default ManipulateDragon;
