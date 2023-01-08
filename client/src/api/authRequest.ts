import request from './axiosInstance'

interface IVariables {
	email: string
	password: string
}

const authRequest = {
	signin: async (variables: IVariables) => {
		return await request({
			method: 'post',
			url: '/users/login',
			data: { ...variables }
		})
	},

	signup: async (variables: IVariables) => {
		return await request({
			method: 'post',
			url: `/users/create`,
			data: { ...variables }
		})
	}
}

export default authRequest
