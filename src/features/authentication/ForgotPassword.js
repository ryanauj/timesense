import { unwrapResult } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { ERROR } from '../../constants/cssVars'
import useInput from '../../hooks/useInput'
import useShowPassword from '../../hooks/useShowPassword'
import {
  forgotPassword,
  forgotPasswordSubmit,
  selectForgotPasswordError,
  selectForgotPasswordSubmitError
} from './authenticationSlice'
import { Tile } from './Tile'

export const ForgotPassword = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const forgotPasswordError = useSelector(selectForgotPasswordError)
  const forgotPasswordSubmitError = useSelector(selectForgotPasswordSubmitError)
  const [receivedCode, setReceivedCode] = useState(false)
  const [email, emailInputComponent] = useInput({
    type: 'email',
    initialValue: '',
    id: 'forgot_password_email'
  })
  const [code, codeInputComponent] = useInput({
    type: 'text',
    initialValue: '',
    id: 'forgot_password_code'
  })

  const [showPassword, showPasswordComponent] = useShowPassword()
  const passwordVisibility = showPassword ? 'text' : 'password'
  const [password, passwordInputComponent] = useInput({
    type: passwordVisibility,
    initialValue: '',
    id: 'forgot_password_password'
  })

  const validateForgotPassword = () => email && email.length > 0

  const handleForgotPassword = async event => {
    try {
      event.preventDefault()
      const forgotPasswordAction = await dispatch(forgotPassword({ email }))
      unwrapResult(forgotPasswordAction)
      setReceivedCode(true)
    } catch (err) {
      console.log('Failed to send forgot password: ', err)
    }
  }

  const validateForgotPasswordSubmit = () =>
    email &&
    email.length > 0 &&
    code &&
    code.length > 0 &&
    password &&
    password.length > 0

  const handleForgotPasswordSubmit = async event => {
    try {
      event.preventDefault()
      const forgotPasswordSubmitAction = await dispatch(
        forgotPasswordSubmit({ email, code, password })
      )
      unwrapResult(forgotPasswordSubmitAction)
      history.push('/login')
    } catch (err) {
      console.log('Failed to submit new password: ', err)
    }
  }

  return !receivedCode ? (
    <>
      <Tile>
        <form onSubmit={handleForgotPassword}>
          <h2>Please enter email:</h2>
          <label htmlFor='forgot_password_email'>Email</label>
          {emailInputComponent}
          {forgotPasswordError && (
            <div style={{ color: ERROR }}>{forgotPasswordError}</div>
          )}
          <button type='submit' disabled={!validateForgotPassword()}>
            Send Code
          </button>
        </form>
        <button onClick={() => setReceivedCode(true)}>
          Already Received Code
        </button>
      </Tile>
    </>
  ) : (
    <>
      <Tile>
        <form onSubmit={handleForgotPasswordSubmit}>
          <label htmlFor='forgot_password_email'>Email</label>
          {emailInputComponent}
          <label htmlFor='forgot_password_code'>Code</label>
          {codeInputComponent}
          <label htmlFor='forgot_password_password'>Password</label>
          {passwordInputComponent}
          {showPasswordComponent}
          {forgotPasswordSubmitError && (
            <div style={{ color: ERROR }}>{forgotPasswordSubmitError}</div>
          )}
          <button type='submit' disabled={!validateForgotPasswordSubmit()}>
            Reset Password
          </button>
        </form>
        <button onClick={() => setReceivedCode(false)}>Resend Code</button>
      </Tile>
    </>
  )
}
