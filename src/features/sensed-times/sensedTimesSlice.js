import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'
import { API } from 'aws-amplify'
import { RequestStatus } from '../../app/RequestStatus'
import { SensedTimes } from './SensedTimes'

const TimeSenseApi = 'TimeSenseApiTest'
const SensedTimesPath = '/api/sensedTimes'

const sensedTimesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
})

const initialState = sensedTimesAdapter.getInitialState({
  status: RequestStatus.Idle,
  error: null
})

export const fetchSensedTimes = createAsyncThunk(
  'sensedTimes/fetchSensedTimes',
  async () => {
    const sensedTimes = API.get(TimeSenseApi, SensedTimesPath)
    console.log(SensedTimes)
    return sensedTimes
  }
)

export const addSensedTime = createAsyncThunk(
  'sensedTimes/addSensedTimes',
  async sensedTime => {
    console.log('sensedTime', sensedTime)
    const completeSensedTime = await API.post(TimeSenseApi, SensedTimesPath, {
      body: sensedTime
    })
    console.log('completeSensedTime', completeSensedTime)
    return completeSensedTime
  }
)

const sensedTimesSlice = createSlice({
  name: 'sensedTimes',
  initialState,
  reducers: {
    sensedTimeAdded: sensedTimesAdapter.addOne,
    sensedTimesCleared: state => {
      sensedTimesAdapter.removeAll(state)
      state.status = RequestStatus.Idle
    }
  },
  extraReducers: {
    [fetchSensedTimes.pending]: (state, action) => {
      state.status = RequestStatus.Pending
    },
    [fetchSensedTimes.fulfilled]: (state, action) => {
      state.status = RequestStatus.Succeeded
      sensedTimesAdapter.upsertMany(state, action.payload)
    },
    [fetchSensedTimes.rejected]: (state, action) => {
      state.status = RequestStatus.Failed
      state.error = action.error.message
    },
    [addSensedTime.fulfilled]: sensedTimesAdapter.addOne
  }
})

export const { sensedTimeAdded, sensedTimesCleared } = sensedTimesSlice.actions

export const {
  selectById: selectSensedTimeById,
  selectIds: selectSensedTimeIds
} = sensedTimesAdapter.getSelectors(state => state.sensedTimes)

export const selectSensedTimesStatus = state => state.sensedTimes.status

export default sensedTimesSlice.reducer
