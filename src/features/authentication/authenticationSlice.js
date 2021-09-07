import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RequestStatus } from '../../app/RequestStatus'
import { Auth } from 'aws-amplify'

const initialState = {
  isAuthenticated: false,
  status: RequestStatus.Idle,
  signUpStatus: RequestStatus.Idle,
  signOutStatus: RequestStatus.Idle,
  error: null
}

export const selectAuthenticationRequestStatus = state =>
  state.authentication.status

export const selectIsAuthenticated = state =>
  state.authentication.isAuthenticated

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
      state.status = RequestStatus.Pending
    },
    [signIn.fulfilled]: (state, action) => {
      state.status = RequestStatus.Succeeded
      state.isAuthenticated = true
    },
    [signIn.rejected]: (state, action) => {
      state.status = RequestStatus.Failed
      state.error = action.error.message
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
      state.error = action.error.message
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
      state.error = action.error.message
    }
  }
})

export const { authUIStateChanged } = authenticationSlice.actions

export default authenticationSlice.reducer
