import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectIsAuthenticated } from '../features/authentication/authenticationSlice'

export const Navbar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const authenticationLinks = isAuthenticated ? (
    <Link to='/logout'>| Logout |</Link>
  ) : (
    <Link to='/login'>| Login |</Link>
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
