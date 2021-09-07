import { unwrapResult } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import useInput from '../../hooks/useInput'
import { signUp } from './authenticationSlice'

export const Signup = () => {
  const dispatch = useDispatch()
  const [email, emailComponent] = useInput('email', '')
  const [password, passwordComponent] = useInput('password', '')
  const [confirmPassword, confirmPasswordComponent] = useInput('password', '')
  const [newUser, setNewUser] = useState(null)

  const validateForm = () =>
    email &&
    email.length > 0 &&
    password &&
    password.length > 0 &&
    password === confirmPassword

  const handleSubmit = async event => {
    try {
      event.preventDefault()
      const signUpAction = await dispatch(signUp({ email, password }))
      unwrapResult(signUpAction)
      setNewUser('test')
    } catch (err) {
      console.log('Failed to signup: ', err)
    }
  }

  const signupForm = () => (
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
        <div>
          <label>Confirm Password</label>
          {confirmPasswordComponent}
        </div>
        <button type='submit' disabled={!validateForm()}>
          Signup
        </button>
      </form>
    </div>
  )

  const confirmationForm = () => (
    <p>Please confirm email with verification link.</p>
  )

  return (
    <div className='signup'>
      {newUser === null ? signupForm() : confirmationForm()}
    </div>
  )
}
