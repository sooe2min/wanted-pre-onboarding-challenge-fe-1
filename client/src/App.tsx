import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router'
import './App.css'

import AuthProvider from './Components/AuthProvider'
import Layout from './Components/Layout'

import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import TodoPage from './Pages/TodoPages'

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<TodoPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
				</Route>
			</Routes>
		</AuthProvider>
	)
}

export default App
