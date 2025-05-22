import { Navbar, Container, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { actions as authUserSlice } from '../slices/authUserSlice.js'

function Header() {
  const dispatch = useDispatch()
  const showButton = useSelector(state => state.authUser.isUserAuth)
  const AuthButton = () => {
    return showButton && (
      <Button
        className="btn btn-primary"
        onClick={() => {
          dispatch(authUserSlice.logOutUser())
        }}
      >
        Выйти
      </Button>
    )
  }
  return (
    <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  )
}

export default Header
