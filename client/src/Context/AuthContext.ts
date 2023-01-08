import React from 'react'

interface AuthContextType {
	token: string | null
	setToken: React.Dispatch<React.SetStateAction<string | null>>
	signup: (callback: VoidFunction) => void
	signin: (callback: VoidFunction) => void
	signout: (callback: VoidFunction) => void
}

export const AuthContext = React.createContext<AuthContextType>(null!)
