import { configureStore } from '@reduxjs/toolkit'

import sensedTimesReducer from '../features/sensed-times/sensedTimesSlice'
import authenticationReducer from '../features/authentication/authenticationSlice'

export default configureStore({
  reducer: {
    sensedTimes: sensedTimesReducer,
    authentication: authenticationReducer
  }
})
