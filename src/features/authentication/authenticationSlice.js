import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authState: null,
  user: null
}

export const selectAuthState = state => state.authentication.authState
export const selectUser = state => state.authentication.user

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authUIStateChanged: (state, action) => {
      state.authentication = action.payload
    }
  }
})

export const { authUIStateChanged } = authenticationSlice.actions

export default authenticationSlice.reducer
