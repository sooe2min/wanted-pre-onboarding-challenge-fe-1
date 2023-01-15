import { Route, Routes } from 'react-router'
import AuthHoc from '../components/HOC/AuthHoc'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import TodoPage from '../pages/TodoPage'

export default function Router() {
	const AuthTodoPage = AuthHoc(TodoPage)

	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/" element={<AuthTodoPage />} />
		</Routes>
	)
}
