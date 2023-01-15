import api from '../lib/axios'

interface Idata {
	email: string
	password: string
}

const users = {
	signin: async (data: Idata) => {
		return await api.post('/users/login', data)
	},

	signup: async (data: Idata) => {
		return await api.post(`/users/create`, data)
	}
}

export default users
