import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import usersApi from '../../api/users'
import { ACCESS_TOKEN_KEY } from '../../constants/token.constant'

function useUserMutations() {
	const navigate = useNavigate()

	return {
		signIn: useMutation({
			mutationFn: usersApi.signin,
			onSuccess: (data: any) => {
				window.localStorage.setItem(ACCESS_TOKEN_KEY, data.token)

				navigate('/')
			}
		}),

		signUp: useMutation({
			mutationFn: usersApi.signup,
			onSuccess: () => {
				navigate('/login')
			}
		})
	}
}

export default useUserMutations
