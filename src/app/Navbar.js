import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {
  selectIsAuthenticated,
  signOut
} from '../features/authentication/authenticationSlice'

export const Navbar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await dispatch(signOut())
    history.push('/')
  }

  const authenticationLinks = isAuthenticated ? (
    <button onClick={handleLogout}>| Logout |</button>
  ) : (
    <>
      <Link to='/signup'>| Signup |</Link>
      <Link to='/login'>| Login |</Link>
    </>
  )

  return (
    <nav>
      <section>
        <h1>TimeSense</h1>

        <div className='navContent'>
          <div className='navLinks'>
            <Link to='/'>| Home |</Link>
            {authenticationLinks}
          </div>
        </div>
      </section>
    </nav>
  )
}
