import { ReactNode, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'

interface IProps {
	children: ReactNode
}

function AuthProvider({ children }: IProps) {
	const [token, setToken] = useState<string | null>(
		typeof window !== 'undefined'
			? (window.localStorage.getItem('token') as string)
			: null
	)

	let signup = (callback: VoidFunction) => {
		callback()
	}

	let signin = (callback: VoidFunction) => {
		callback()
	}

	let signout = (callback: VoidFunction) => {
		callback()
		setToken(null)
	}

	const value = { token, setToken, signup, signin, signout }

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	)
}

export default AuthProvider
