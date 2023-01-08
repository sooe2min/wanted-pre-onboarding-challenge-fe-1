import axios from 'axios'

const request = axios.create({
	baseURL:
		process.env.REACT_APP_SERVER_API_PROD || 'http://localhost:8080',
	headers: {
		'Content-Type': `application/json`,
		Authorization: `${
			typeof window !== 'undefined'
				? (window.localStorage.getItem('token') as string)
				: null
		}`
	}
})

request.interceptors.response.use(
	function (response) {
		// console.log(response)

		if (response.status === 200) {
			return response.data
		}
	},
	function (error) {
		console.log(error)

		return Promise.reject(error)
	}
)

export default request
