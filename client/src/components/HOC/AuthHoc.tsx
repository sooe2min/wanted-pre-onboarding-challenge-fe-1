import { ComponentType } from 'react'
import useTokenCheck from '../../hooks/auth/useTokenCheck'

export default function AuthHoc(AuthComponent: ComponentType) {
	function AuthCheck() {
		const { isAuthority } = useTokenCheck()

		if (!isAuthority) {
			window.alert('토큰이 존재하지 않습니다.')
			window.location.href = '/login'

			return <></>
		}

		return <AuthComponent />
	}

	return AuthCheck
}
