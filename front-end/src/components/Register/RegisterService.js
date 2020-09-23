import axios from 'axios';

class RegisterService {
	create(data) {
		const configRequest = {
			method: 'POST',
			url: 'http://localhost:3000/users/',
			data
		};

		return axios(configRequest)
			.then(res => ({
				user: res.data
			}))
			.catch(() => ({
				error: 'E-mail já utilizado. Tente com um novo e-mail.'
			}));
	}
}

export default new RegisterService();
