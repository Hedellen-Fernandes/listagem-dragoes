import React, { useState, useContext, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';

import StoreContext from '../Store/Context';

import loginService from './LoginService';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '../Form/Input';
import prepareErrorMessages from '../Form/helpers/prepareErrors';

import UIButton from '../UI/Button/Button';

async function validateForm(data) {
	const schema = Yup.object().shape({
		email: Yup.string()
			.required('O campo e-mail é obrigatório')
			.email('Digite um e-mail válido'),
		password: Yup.string().required('O campo senha é obrigatório')
	});

	return await schema.validate(data, { abortEarly: false });
}

const UserLogin = () => {
	const formRef = useRef(null);
	const [error, setError] = useState(null);
	const { setToken } = useContext(StoreContext);
	const history = useHistory();

	async function onSubmit(data, { reset }) {
		try {
			await validateForm(data);
			const { token, error } = await loginService.login(data);

			if (token) {
				setToken(token);
				return history.push('/dragons');
			}

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
				<h1 className="title">Acessar o Sistema</h1>
				<Form ref={formRef} onSubmit={onSubmit}>

					<div className="form-control">
						<label htmlFor="email">E-mail</label>
						<Input name='email' autoComplete="off" />
					</div>
					<div className="form-control">
						<label htmlFor="password">Senha</label>
						<Input type="password" name='password' />
					</div>


					{error && <span> {error} </span>}

					<UIButton type="submit" theme="contained-green" className="submit-button" rounded>
						Entrar
					</UIButton>

					<div className='link'>
						<Link to="/register">Criar uma nova conta</Link>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default UserLogin;
