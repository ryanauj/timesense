import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RequestStatus } from '../../app/RequestStatus'
import { Auth } from 'aws-amplify'

const initialState = {
  isAuthenticated: false,
  status: RequestStatus.Idle,
  error: null
}

export const selectIsAuthenticated = state =>
  state.authentication.isAuthenticated

export const signIn = createAsyncThunk(
  'authentication/signIn',
  async ({ email, password }) => {
    const response = await Auth.signIn(email, password)
    return response.posts
  }
)

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
    }
  }
})

export const { authUIStateChanged } = authenticationSlice.actions

export default authenticationSlice.reducer
