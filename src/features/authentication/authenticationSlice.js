import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RequestStatus } from '../../app/RequestStatus'
import { Auth } from 'aws-amplify'

const initialState = {
  isAuthenticated: false,
  authenticationStatus: RequestStatus.Idle,
  authenticationError: null,
  signUpStatus: RequestStatus.Idle,
  signUpError: null,
  forgotPasswordStatus: RequestStatus.Idle,
  forgotPasswordError: null,
  forgotPasswordSubmitStatus: RequestStatus.Idle,
  forgotPasswordSubmitError: null
}

export const selectAuthenticationRequestStatus = state =>
  state.authentication.authenticationStatus

export const selectIsAuthenticated = state =>
  state.authentication.isAuthenticated

export const selectAuthenticationError = state =>
  state.authentication.authenticationError

export const selectSignUpError = state => state.authentication.signUpError

export const selectForgotPasswordError = state =>
  state.authentication.selectForgotPasswordError

export const selectForgotPasswordSubmitError = state =>
  state.authentication.selectForgotPasswordSubmitError

export const signIn = createAsyncThunk(
  'authentication/signIn',
  async ({ email, password }) => {
    const response = await Auth.signIn(email, password)
    return response.posts
  }
)

export const signUp = createAsyncThunk(
  'authentication/signUp',
  async ({ email, password }) => {
    const response = await Auth.signUp({
      username: email,
      password: password
    })
    return response.posts
  }
)

export const signOut = createAsyncThunk('authentication/signOut', async () => {
  await Auth.signOut()
})

export const checkAuthStatus = createAsyncThunk(
  'authentication/checkAuthStatus',
  async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      return user ? true : false
    } catch {
      return false
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'authentication/forgotPassword',
  async ({ email }) => {
    await Auth.forgotPassword(email)
  }
)

export const forgotPasswordSubmit = createAsyncThunk(
  'authentication/forgotPasswordSubmit',
  async ({ email, code, password }) => {
    await Auth.forgotPasswordSubmit(email, code, password)
  }
)

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: {
    [signIn.pending]: state => {
      state.authenticationStatus = RequestStatus.Pending
    },
    [signIn.fulfilled]: (state, action) => {
      state.authenticationStatus = RequestStatus.Succeeded
      state.isAuthenticated = true
    },
    [signIn.rejected]: (state, action) => {
      state.authenticationStatus = RequestStatus.Failed
      state.authenticationError = action.error.message
      state.isAuthenticated = false
    },
    [signUp.pending]: state => {
      state.signUpStatus = RequestStatus.Pending
    },
    [signUp.fulfilled]: state => {
      state.signUpStatus = RequestStatus.Succeeded
    },
    [signUp.rejected]: (state, action) => {
      state.signUpStatus = RequestStatus.Failed
      state.signUpError = action.error.message
    },
    [signOut.pending]: state => {
      state.signOutStatus = RequestStatus.Pending
    },
    [signOut.fulfilled]: state => {
      state.signOutStatus = RequestStatus.Succeeded
      state.isAuthenticated = false
    },
    [signOut.rejected]: (state, action) => {
      state.signOutStatus = RequestStatus.Failed
      state.signOutError = action.error.message
    },
    [forgotPassword.pending]: state => {
      state.forgotPasswordStatus = RequestStatus.Pending
    },
    [forgotPassword.fulfilled]: state => {
      state.forgotPasswordStatus = RequestStatus.Succeeded
    },
    [forgotPassword.rejected]: (state, action) => {
      state.forgotPasswordStatus = RequestStatus.Failed
      state.forgotPasswordError = action.error.message
    },
    [forgotPasswordSubmit.pending]: state => {
      state.forgotPasswordSubmitStatus = RequestStatus.Pending
    },
    [forgotPasswordSubmit.fulfilled]: state => {
      state.forgotPasswordSubmitStatus = RequestStatus.Succeeded
    },
    [forgotPasswordSubmit.rejected]: (state, action) => {
      state.forgotPasswordSubmitStatus = RequestStatus.Failed
      state.forgotPasswordSubmitError = action.error.message
    },
    [checkAuthStatus.fulfilled]: (state, action) => {
      state.isAuthenticated = action.payload
    }
  }
})

export const { authUIStateChanged } = authenticationSlice.actions

export default authenticationSlice.reducer
