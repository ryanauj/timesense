import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { RequestStatus } from '../../app/RequestStatus'
import useInput from '../../hooks/useInput'
import { signIn } from './authenticationSlice'

export const Login = () => {
  const dispatch = useDispatch()
  const [email, emailComponent, setEmail] = useInput('email', '')
  const [password, passwordComponent, setPassword] = useInput('password', '')
  const [signInStatus, setSignInStatus] = useState(RequestStatus.Idle)

  const validateForm = () =>
    email && email.length > 0 && password && password.length > 0

  const handleSubmit = async event => {
    try {
      event.preventDefault()
      setSignInStatus(RequestStatus.Pending)
      const signInAction = await dispatch(signIn({ email, password }))
      unwrapResult(signInAction)
      setEmail('')
      setPassword('')
    } catch (err) {
      console.log('Failed to login: ', err)
    } finally {
      setSignInStatus(RequestStatus.Idle)
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
