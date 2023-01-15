import { Button, Container, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN_KEY } from '../constants/token.constant'

function Layout() {
	const navigate = useNavigate()

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
								window.localStorage.removeItem(ACCESS_TOKEN_KEY)

								navigate('/login')
							}}>
							로그아웃
						</Button>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	)
}

export default Layout
