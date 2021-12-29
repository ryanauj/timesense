import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { ERROR } from '../../constants/cssVars'
import useInput from '../../hooks/useInput'
import useShowPassword from '../../hooks/useShowPassword'
import {
  selectAuthenticationError,
  selectIsAuthenticated,
  signIn
} from './authenticationSlice'
import { Tile } from './Tile'

export const Login = () => {
  const dispatch = useDispatch()
  const [email, emailComponent, setEmail] = useInput({
    type: 'email',
    initialValue: '',
    id: 'login_email'
  })

  const [showPassword, showPasswordComponent] = useShowPassword()
  const passwordVisibility = showPassword ? 'text' : 'password'
  const [password, passwordComponent, setPassword] = useInput({
    type: passwordVisibility,
    initialValue: '',
    id: 'login_password'
  })

  const isAuthenticated = useSelector(selectIsAuthenticated)
  const error = useSelector(selectAuthenticationError)

  if (isAuthenticated) return <Redirect push to='/sensor' />

  const validateForm = () =>
    email && email.length > 0 && password && password.length > 0

  const handleSubmit = async event => {
    try {
      event.preventDefault()
      const emailToInput = email
      const passwordToInput = password
      setEmail('')
      setPassword('')
      const signInAction = await dispatch(
        signIn({ email: emailToInput, password: passwordToInput })
      )
      unwrapResult(signInAction)
    } catch (err) {
      console.log('Failed to login: ', err)
    }
  }

  return (
    <Tile>
      <form onSubmit={handleSubmit}>
        <h2>Log in</h2>
        <label htmlFor='login_email'>Email</label>
        {emailComponent}
        <label>Password</label>
        {passwordComponent}
        {showPasswordComponent}
        {error && <div style={{ color: ERROR }}>{error}</div>}
        <button type='submit' disabled={!validateForm()}>
          Log in
        </button>
      </form>
      <Link to='/forgotPassword'>Forgot Password?</Link>
    </Tile>
  )
}
