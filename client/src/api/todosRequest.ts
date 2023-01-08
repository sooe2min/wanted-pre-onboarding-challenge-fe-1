import request from './axiosInstance'

const todosRequest = {
	getTodos: async () => {
		return await request({
			method: 'GET',
			url: '/todos'
		})
	},

	getTodoById: async (variables: { id: number }) => {
		const { id } = variables

		return await request({
			method: 'GET',
			url: `/todos/${id}`,
			data: { ...variables }
		})
	},

	createTodo: async (variables: { title: string; content: string }) => {
		return await request({
			method: 'POST',
			url: `/todos`,
			data: { ...variables }
		})
	},

	updateTodo: async (variables: {
		id: number
		title: string
		content: string
	}) => {
		const { id } = variables

		return await request({
			method: 'PUT',
			url: `/todos/${id}`,
			data: { ...variables }
		})
	},

	deleteTodo: async (variables: { id: number }) => {
		const { id } = variables

		return await request({
			method: 'DELETE',
			url: `/todos/${id}`,
			data: { ...variables }
		})
	}
}

export default todosRequest
