import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
  const isUserAuth = useSelector(state => state.authUser.isUserAuth)

  if (isUserAuth) {
    return <Outlet />
  }
  else {
    return <Navigate to="/login" />
  }
}

export default PrivateRoute
