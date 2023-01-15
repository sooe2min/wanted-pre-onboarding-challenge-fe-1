import axios, { AxiosRequestConfig } from 'axios'
import { ACCESS_TOKEN_KEY } from '../constants/token.constant'

const api = axios.create({
	baseURL: process.env.REACT_APP_SERVER_API_PROD || 'http://localhost:8080'
})

api.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const token = `${
			typeof window !== 'undefined'
				? (window.localStorage.getItem(ACCESS_TOKEN_KEY) as string)
				: null
		}`

		if (token) {
			config.headers = {}
			config.headers.Authorization = token
		}

		return config
	},
	error => Promise.reject(error)
)

api.interceptors.response.use(
	function (response) {
		if (response.status === 200) {
			return response.data
		}
	},
	function (error) {
		console.log(error)

		return Promise.reject(error)
	}
)

export default api
