import api from '../lib/axios'

const todos = {
	getTodos: async () => {
		return await api.get('/todos')
	},

	getTodoById: async (id: number) => {
		return await api.get(`/todos/${id}`)
	},

	createTodo: async (data: { title: string; content: string }) => {
		return await api.post(`/todos`, data)
	},

	updateTodo: async ({
		id,
		data
	}: {
		id: number
		data: {
			title: string
			content: string
		}
	}) => {
		return await api.put(`/todos/${id}`, data)
	},

	deleteTodo: async (id: number) => {
		return await api.delete(`/todos/${id}`)
	}
}

export default todos
