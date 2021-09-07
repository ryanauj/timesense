import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import { selectIsAuthenticated, signIn } from './authenticationSlice'

export const Login = () => {
  const dispatch = useDispatch()
  const [email, emailComponent, setEmail] = useInput('email', '')
  const [password, passwordComponent, setPassword] = useInput('password', '')
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return <Redirect push to='/' />
  }

  const validateForm = () =>
    email && email.length > 0 && password && password.length > 0

  const handleSubmit = async event => {
    try {
      event.preventDefault()
      const signInAction = await dispatch(signIn({ email, password }))
      unwrapResult(signInAction)
      setEmail('')
      setPassword('')
    } catch (err) {
      console.log('Failed to login: ', err)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          {emailComponent}
        </div>
        <div>
          <label>Password</label>
          {passwordComponent}
        </div>
        <button type='submit' disabled={!validateForm()}>
          Login
        </button>
      </form>
    </div>
  )
}
