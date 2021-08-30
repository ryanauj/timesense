import { configureStore } from '@reduxjs/toolkit'

import sensedTimesReducer from '../features/sensed-times/sensedTimesSlice'

export default configureStore({
  reducer: {
    sensedTimes: sensedTimesReducer
  }
})
