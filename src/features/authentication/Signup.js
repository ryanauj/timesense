import { unwrapResult } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import { signIn, signUp } from './authenticationSlice'

export const Signup = () => {
  const dispatch = useDispatch()
  const [email, emailComponent, setEmail] = useInput('email', '')
  const [password, passwordComponent, setPassword] = useInput('password', '')
  const [confirmPassword, confirmPasswordComponent, setConfirmPassword] =
    useInput('password', '')
  const [confirmationCode, confirmationCodeComponent, setConfirmationCode] =
    useInput('text', '')
  const history = useHistory()
  const [newUser, setNewUser] = useState(null)

  const validateForm = () =>
    email &&
    email.length > 0 &&
    password &&
    password.length > 0 &&
    password === confirmPassword

  const validateConfirmationForm = () =>
    confirmationCode && confirmationCode.length > 0

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

  const handleConfirmationSubmit = event => {
    event.preventDefault()
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
    <div>
      <form onSubmit={handleConfirmationSubmit}>
        <div>
          <label>Confirmation Code</label>
          {confirmationCodeComponent}
        </div>
        <button type='submit' disabled={!validateConfirmationForm()}>
          Verify
        </button>
      </form>
    </div>
  )

  return (
    <div className='signup'>
      {newUser === null ? signupForm() : confirmationForm()}
    </div>
  )
}
