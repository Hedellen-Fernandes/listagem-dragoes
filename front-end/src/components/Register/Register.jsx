import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import registerService from './RegisterService';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '../Form/Input';
import prepareErrorMessages from '../Form/helpers/prepareErrors';

import UIButton from '../UI/Button/Button';

async function validateForm(data) {
	const schema = Yup.object().shape({
		firstName: Yup.string().required('O campo nome é obrigatório'),
		lastName: Yup.string().required('O campo sobrenome é obrigatório'),
		password: Yup.string().required('O campo senha é obrigatório'),
		email: Yup.string()
			.required('O campo e-mail é obrigatório')
			.email('Digite um e-mail válido'),
	});

	return await schema.validate(data, { abortEarly: false });
}

const UserRegister = () => {
	const formRef = useRef(null);
	const [error, setError] = useState(null);
	const history = useHistory();

	async function onSubmit(data, { reset }) {
		try {
			await validateForm(data);
			const { user, error } = await registerService.create(data);

			if (user)
				return history.push('/');

			formRef.current.setErrors({});
			setError(error);
			reset();

		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errorMessages = prepareErrorMessages(err);
				formRef.current.setErrors(errorMessages);
			}
		}
	}

	return (

		<div className="container-form">
			<div className="form">


				<Link to="/" className="back">Voltar para página anterior</Link>

				<h1 className="title">Criar uma nova conta</h1>

				<Form ref={formRef} onSubmit={onSubmit}>

					<div className="form-control">
						<label htmlFor="firstName">Nome</label>
						<Input name='firstName' />
					</div>

					<div className="form-control">
						<label htmlFor="lastName">Sobrenome</label>
						<Input name='lastName' />
					</div>

					<div className="form-control">
						<label htmlFor="email">E-mail</label>
						<Input name='email' />
					</div>

					<div className="form-control">
						<label htmlFor="password">Senha</label>
						<Input type='password' name='password' />
					</div>

					{error && (<div className="error">{error}</div>)}

					<UIButton type="submit" theme="contained-green" className="submit-button" rounded>
						Entrar
					</UIButton>
				</Form>
			</div>
		</div>
	);
};

export default UserRegister;
