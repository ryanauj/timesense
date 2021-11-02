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
    <li className='right'>
      <button onClick={handleLogout}>Logout</button>
    </li>
  ) : (
    <>
      <li className='right'>
        <Link to='/signup'>Signup</Link>
      </li>
      <li className='right'>
        <Link to='/login'>Login</Link>
      </li>
    </>
  )

  return (
    <ul className='navbar'>
      <li id='app_name'>
        <Link to='/'>TimeSense</Link>
      </li>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/sensedTimes'>Sensed Times</Link>
      </li>
      <li>
        <Link to='/metrics'>Metrics</Link>
      </li>
      {authenticationLinks}
    </ul>
  )
}
