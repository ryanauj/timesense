import { unwrapResult } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ERROR } from '../../constants/cssVars'
import useInput from '../../hooks/useInput'
import useShowPassword from '../../hooks/useShowPassword'
import { selectSignUpError, signUp } from './authenticationSlice'
import { Tile } from './Tile'

export const Signup = () => {
  const dispatch = useDispatch()
  const [newUser, setNewUser] = useState(null)
  const error = useSelector(selectSignUpError)

  const [email, emailComponent] = useInput({
    type: 'email',
    initialValue: '',
    id: 'signup_email'
  })

  const [showPassword, showPasswordComponent] = useShowPassword()
  const passwordVisibility = showPassword ? 'text' : 'password'
  const [password, passwordComponent] = useInput({
    type: passwordVisibility,
    initialValue: '',
    id: 'signup_password'
  })
  const [confirmPassword, confirmPasswordComponent] = useInput({
    type: passwordVisibility,
    initialValue: '',
    id: 'signup_confirm_password'
  })

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
    <Tile>
      <form onSubmit={handleSubmit}>
        <h2>Sign up</h2>
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
        {showPasswordComponent}
        {error && <div style={{ color: ERROR }}>{error}</div>}
        <button type='submit' disabled={!validateForm()}>
          Sign up
        </button>
      </form>
    </Tile>
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
