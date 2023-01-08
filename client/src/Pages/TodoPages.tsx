import { useState } from 'react'
import { Button, Container, Form, ListGroup } from 'react-bootstrap'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import todosRequest from '../api/todosRequest'

function TodoPage() {
	const [formData, setFormData] = useState({
		title: '',
		content: ''
	})
	const [isModify, setIsModify] = useState(false)
	const [modifyContent, setModifyContent] = useState(false)

	const queryClient = useQueryClient()
	const { isLoading, data } = useQuery({
		queryKey: ['todos'],
		queryFn: todosRequest.getTodos
	})

	const createTodo = useMutation({
		mutationFn: todosRequest.createTodo,
		onSuccess: () => {
			queryClient.invalidateQueries('todos')
		}
	})

	const updateTodo = useMutation({
		mutationFn: todosRequest.updateTodo,
		onSuccess: () => {
			queryClient.invalidateQueries('todos')
		}
	})

	const deleteTodo = useMutation({
		mutationFn: todosRequest.deleteTodo,
		onSuccess: () => {
			queryClient.invalidateQueries('todos')
		}
	})

	const handleChange = (event: any) => {
		const { name, value } = event.target

		let title = ''
		let content = ''

		if (name === 'title') {
			title = value

			setFormData(prev => {
				return {
					...prev,
					title
				}
			})
		} else if (name === 'content') {
			content = value

			setFormData(prev => {
				return {
					...prev,
					content
				}
			})
		}
	}

	const handleSubmit = (event: any) => {
		event.preventDefault()
		event.stopPropagation()

		createTodo.mutate({
			title: formData.title,
			content: formData.content
		})
	}

	if (isLoading) {
		return <span>Loading...</span>
	}

	return (
		<Container>
			<div className="fs-5 fw-bold">Todo 추가</div>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-2" controlId="formBasicEmail">
					<Form.Label>title</Form.Label>
					<Form.Control name="title" type="text" onChange={handleChange} />
				</Form.Group>

				<Form.Group className="mb-2" controlId="formBasicEmail">
					<Form.Label>content</Form.Label>
					<Form.Control
						name="content"
						type="text"
						onChange={handleChange}
					/>
				</Form.Group>
				<Button className="mb-4" variant="primary" type="submit">
					추가
				</Button>
			</Form>

			<div className="fs-5 fw-bold">Todo 목록</div>
			<ListGroup>
				{data?.data instanceof Array &&
					data?.data.map((todo: any) => {
						return (
							<div
								key={todo?.id}
								className="d-flex align-items-center mb-2">
								{isModify ? (
									<>
										<ListGroup.Item
											as="li"
											className="d-flex justify-content-between align-items-start w-100">
											<div className="">
												title
												<div className="fw-bold mb-1">
													<Form.Control
														className="w-100"
														name="title"
														type="text"
														defaultValue={todo?.title}
														onChange={handleChange}
													/>
												</div>
												content
												<Form.Control
													className="w-100"
													name="content"
													type="text"
													defaultValue={todo?.content}
													onChange={handleChange}
												/>
											</div>
										</ListGroup.Item>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="30"
											height="30"
											fill="currentColor"
											className="bi bi-check-lg ms-2"
											viewBox="0 0 16 16"
											onClick={() => {
												updateTodo.mutate({
													id: todo?.id,
													title: formData.title,
													content: formData.content
												})

												setIsModify(false)
											}}>
											<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
										</svg>
									</>
								) : (
									<>
										<ListGroup.Item
											as="li"
											className="d-flex justify-content-between align-items-start w-100">
											<div className="ms-2 me-auto">
												<div className="fw-bold">title: {todo?.title}</div>
												<div>content: {todo?.content}</div>
											</div>
										</ListGroup.Item>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="30"
											height="30"
											fill="currentColor"
											className="bi bi-pencil ms-2"
											viewBox="0 0 16 16"
											onClick={() => {
												setIsModify(true)
											}}>
											<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="30"
											height="30"
											fill="currentColor"
											className="bi bi-trash3 ms-2"
											viewBox="0 0 16 16"
											onClick={() => {
												deleteTodo.mutate({ id: todo?.id })
											}}>
											<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
										</svg>
									</>
								)}
							</div>
						)
					})}
			</ListGroup>
		</Container>
	)
}

export default TodoPage
