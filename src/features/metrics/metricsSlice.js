import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API } from 'aws-amplify'
import { RequestStatus } from '../../app/RequestStatus'

const TimeSenseApi = 'TimeSenseApiTest'
const MetricsPath = '/api/metrics'

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

export const fetchMetrics = createAsyncThunk(
  'metrics/fetchMetrics',
  async () => {
    const metrics = API.get(TimeSenseApi, MetricsPath)
    console.log(metrics)
    return metrics
  }
)

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    sensedTimeAdded: state => {
      state.status = RequestStatus.Idle
    }
  },
  extraReducers: {
    [fetchMetrics.pending]: state => {
      state.status = RequestStatus.Pending
    },
    [fetchMetrics.fulfilled]: (state, action) => {
      state.status = RequestStatus.Succeeded
      state.metrics = action.payload
    },
    [fetchMetrics.rejected]: (state, action) => {
      state.status = RequestStatus.Failed
      state.error = action.error.message
      state.isAuthenticated = false
    }
  }
})

export const { sensedTimeAdded } = metricsSlice.actions

export default metricsSlice.reducer
