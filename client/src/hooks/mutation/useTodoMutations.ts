import { useMutation, useQueryClient } from 'react-query'
import todosApi from '../../api/todos'

function useTodoMutations() {
	const queryClient = useQueryClient()

	return {
		createTodo: useMutation({
			mutationFn: todosApi.createTodo,
			onSuccess: () => {
				queryClient.invalidateQueries('todos')
			}
		}),

		updateTodo: useMutation({
			mutationFn: todosApi.updateTodo,
			onSuccess: () => {
				queryClient.invalidateQueries('todos')
			}
		}),

		deleteTodo: useMutation({
			mutationFn: todosApi.deleteTodo,
			onSuccess: () => {
				queryClient.invalidateQueries('todos')
			}
		})
	}
}

export default useTodoMutations
