import { configureStore } from '@reduxjs/toolkit'

import sensedTimesReducer from '../features/sensed-times/sensedTimesSlice'
import authenticationReducer from '../features/authentication/authenticationSlice'
import metricsReducer from '../features/metrics/metricsSlice'

export default configureStore({
  reducer: {
    sensedTimes: sensedTimesReducer,
    authentication: authenticationReducer,
    metrics: metricsReducer
  }
})
