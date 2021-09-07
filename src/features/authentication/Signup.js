import { unwrapResult } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../../hooks/useInput'
import { selectSignUpError, signUp } from './authenticationSlice'

export const Signup = () => {
  const dispatch = useDispatch()
  const [email, emailComponent] = useInput('email', '')
  const [password, passwordComponent] = useInput('password', '')
  const [confirmPassword, confirmPasswordComponent] = useInput('password', '')
  const [newUser, setNewUser] = useState(null)
  const error = useSelector(selectSignUpError)

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
        {error !== null ? <p>{error}</p> : null}
      </form>
    </div>
  )

  const confirmationForm = () => (
    <p>Please confirm email with verification link.</p>
  )

  const useSignupForm = newUser === null || error !== null

  return (
    <div className='signup'>
      {useSignupForm ? signupForm() : confirmationForm()}
    </div>
  )
}
