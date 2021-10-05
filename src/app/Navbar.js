import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {
  checkAuthStatus,
  selectIsAuthenticated,
  signOut
} from '../features/authentication/authenticationSlice'
import { sensedTimesCleared } from '../features/sensed-times/sensedTimesSlice'

export const Navbar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthStatus()).unwrap()
  })

  const handleLogout = async () => {
    await dispatch(signOut())
    await dispatch(sensedTimesCleared())
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
            <Link to='/sensedTimes'>| Sensed Times |</Link>
            <Link to='/metrics'>| Metrics |</Link>
            {authenticationLinks}
          </div>
        </div>
      </section>
    </nav>
  )
}
