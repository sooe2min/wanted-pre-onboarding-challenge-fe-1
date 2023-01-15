import todosApi from '../../api/todos'

function useTodoQueries() {
	return {
		getTodos: {
			queryKey: ['todos'],
			queryFn: todosApi.getTodos
		}
	}
}

export default useTodoQueries
