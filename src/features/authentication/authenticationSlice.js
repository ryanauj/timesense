import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RequestStatus } from '../../app/RequestStatus'
import { Auth } from 'aws-amplify'

const initialState = {
  isAuthenticated: false,
  authenticationStatus: RequestStatus.Idle,
  authenticationError: null,
  signUpStatus: RequestStatus.Idle,
  signUpError: null
}

export const selectAuthenticationRequestStatus = state =>
  state.authentication.authenticationStatus

export const selectIsAuthenticated = state =>
  state.authentication.isAuthenticated

export const selectAuthenticationError = state =>
  state.authentication.authenticationError

export const selectSignUpError = state => state.authentication.signUpError

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

export const signOut = createAsyncThunk('authentication/signOut', () => {
  Auth.signOut()
})

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
    [signOut.fulfilled]: state => {
      state.isAuthenticated = false
    }
  }
})

export const { authUIStateChanged } = authenticationSlice.actions

export default authenticationSlice.reducer
