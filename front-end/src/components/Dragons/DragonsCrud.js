import axios from 'axios';

class DragonsCrud {
	async create(data) {
		const requestConfig = {
			method: 'POST',
			url: 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon',
			data
		}

		return await axios(requestConfig)
			.then(res => res.data)
			.catch(err => err);
	}

	async read() {
		const requestConfig = {
			method: 'GET',
			url: `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/`
		}

		return await axios(requestConfig)
			.then(res => res.data)
			.catch(err => err);
	}

	async get(id) {
		const requestConfig = {
			method: 'GET',
			url: `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`
		}

		return await axios(requestConfig)
			.then(res => res.data)
			.catch(err => err);
	}

	async update(id, data) {
		const requestConfig = {
			method: 'PUT',
			url: `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`,
			data
		}

		return await axios(requestConfig).then(res => res.data);
	}

	async delete(dragonId) {
		const requestConfig = {
			method: 'DELETE',
			url: `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${dragonId}`
		}

		return await axios(requestConfig)
			.then(res => res.data)
			.catch(err => err);
	}
}


export default new DragonsCrud();
