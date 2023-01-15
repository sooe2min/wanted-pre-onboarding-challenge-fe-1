import { useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import useUserMutations from '../../hooks/mutation/useUserMutations'

function Signup() {
	const [validated, setValidated] = useState(false)
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})

	const handleChange = (event: any) => {
		const form = event.currentTarget

		if (form.checkValidity()) {
			const { name, value } = event.target

			setFormData(prev => {
				return { ...prev, [name]: value }
			})
			setValidated(true)
		} else {
			setValidated(false)
		}
	}

	const handleSubmit = (event: any) => {
		event.preventDefault()
		event.stopPropagation()

		useUserMutations().signUp.mutate({
			email: formData.email,
			password: formData.password
		})

		setFormData({ email: '', password: '' })
		setValidated(false)
	}

	return (
		<div className="mt-5">
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						required
						name="email"
						type="email"
						placeholder="name@example.com"
						pattern=".+@[a-zA-Z0-9]+\..{2,3}"
						onChange={handleChange}
					/>
					<Form.Control.Feedback type="invalid">
						이메일 조건: 최소 @, . 포함
					</Form.Control.Feedback>
					<Form.Control.Feedback type="valid">
						Looks good!
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						required
						name="password"
						type="password"
						placeholder="Password"
						minLength={8}
						onChange={handleChange}
					/>
					<Form.Control.Feedback type="invalid">
						비밀번호 조건 : 8자 이상 입력
					</Form.Control.Feedback>
					<Form.Control.Feedback type="valid">
						Looks good!
					</Form.Control.Feedback>
				</Form.Group>

				<Stack>
					<Button variant="primary" type="submit" disabled={!validated}>
						회원가입
					</Button>
				</Stack>
			</Form>
		</div>
	)
}

export default Signup
