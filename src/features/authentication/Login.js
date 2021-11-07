import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import {
  selectAuthenticationError,
  selectIsAuthenticated,
  signIn
} from './authenticationSlice'

export const Login = () => {
  const dispatch = useDispatch()
  const [email, emailComponent, setEmail] = useInput({
    type: 'email',
    initialValue: '',
    id: 'login_email'
  })
  const [password, passwordComponent, setPassword] = useInput({
    type: 'password',
    initialValue: '',
    id: 'login_password'
  })
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const error = useSelector(selectAuthenticationError)

  if (isAuthenticated) return <Redirect push to='/' />

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
    <div>
      <form onSubmit={handleSubmit}>
        <label for='login_email'>Email</label>
        {emailComponent}
        <label>Password</label>
        {passwordComponent}
        <button type='submit' disabled={!validateForm()}>
          Login
        </button>
        {error !== null ? <p>{error}</p> : null}
      </form>
    </div>
  )
}
