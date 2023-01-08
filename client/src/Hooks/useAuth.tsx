import React from 'react'
import { AuthContext } from '../Context/AuthContext'

function useAuth() {
	return React.useContext(AuthContext)
}

export default useAuth
