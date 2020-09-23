import axios from 'axios';

class LoginService {
	login({
		email,
		password
	}) {
		const configRequest = {
			method: 'POST',
			url: 'http://localhost:3000/auth/',
			data: {
				email,
				password
			}
		};

		return axios(configRequest)
			.then(res => res.data)
			.then(res => ({
				token: res.token
			}))
			.catch(() => ({
				error: 'Usuário ou senha inválido'
			}));
	}
}

export default new LoginService();
