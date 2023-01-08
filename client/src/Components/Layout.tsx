import { useEffect } from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'

function Layout() {
	const auth = useAuth()
	const navigate = useNavigate()
	const { pathname } = useLocation()

	useEffect(() => {
		if (!auth.token && pathname !== '/login') {
			window.alert('토큰이 유효하지 않습니다. 로그인을 해주세요.')

			navigate('/login')
		}
	}, [auth.token])

	return (
		<div className="col-md-5 mx-auto">
			<Navbar>
				<Container>
					<Navbar.Brand href="/">Wanted Challenge</Navbar.Brand>
					{/* <Navbar.Text>{auth.token}님 환영합니다.</Navbar.Text> */}
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Button
							variant="primary"
							onClick={() => {
								window.localStorage.removeItem('token')

								auth.signout(() => navigate('/login'))
							}}>
							로그아웃
						</Button>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Outlet />
		</div>
	)
}

export default Layout
