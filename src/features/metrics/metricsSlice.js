import { createSlice } from '@reduxjs/toolkit'
import { RequestStatus } from '../../app/RequestStatus'
import { fetchSensedTimesByTargetTime } from '../sensed-times/sensedTimesSlice'

const initialState = {
  metrics: {},
  status: RequestStatus.Idle,
  error: null
}

export const selectAverages = state =>
  Object.entries(state.metrics.metrics).reduce(
    (prev, [curKey, curVal]) => ({ ...prev, [curKey]: curVal.average }),
    {}
  )
export const selectMetrics = state => {
  const metrics = state.metrics.metrics
  return metrics?.metrics ?? metrics
}
export const selectMetricsStatus = state => state.metrics.status
export const selectMetricsError = state => state.metrics.error

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    sensedTimeAdded: state => {
      state.status = RequestStatus.Idle
    }
  },
  extraReducers: {
    [fetchSensedTimesByTargetTime.pending]: state => {
      state.status = RequestStatus.Pending
    },
    [fetchSensedTimesByTargetTime.fulfilled]: (state, action) => {
      state.status = RequestStatus.Succeeded
      const metrics = {}

      for (let targetTime in action.payload) {
        metrics[targetTime] = action.payload[targetTime].metrics
      }

      state.metrics = metrics
    },
    [fetchSensedTimesByTargetTime.rejected]: (state, action) => {
      state.status = RequestStatus.Failed
      state.error = action.error.message
    }
  }
})

export const { sensedTimeAdded } = metricsSlice.actions

export default metricsSlice.reducer
