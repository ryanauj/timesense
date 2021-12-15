import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API } from 'aws-amplify'
import { RequestStatus } from '../../app/RequestStatus'

const TimeSenseApi = 'TimeSenseApiTest'
const SensedTimesPath = '/api/sensedTimes'

// STATE FORMAT - sensedTimes
// sensedTimes: {
//   byTargetTime : {
//     1: {
//       byId: {
//         'abc': { ... }
//       },
//       allIds: ['abc']
//     }
//   },
//   allTargetTimes: [1]
// }
const initialState = {
  sensedTimes: {
    byTargetTime: {},
    allTargetTimes: []
  },
  status: RequestStatus.Idle,
  error: null
}

export const fetchSensedTimes = createAsyncThunk(
  'sensedTimes/fetchSensedTimes',
  async () => {
    const sensedTimes = await API.get(TimeSenseApi, SensedTimesPath)
    console.log(sensedTimes)
    return sensedTimes
  }
)

export const addSensedTime = createAsyncThunk(
  'sensedTimes/addSensedTime',
  async sensedTime => {
    const completeSensedTime = await API.post(TimeSenseApi, SensedTimesPath, {
      body: sensedTime
    })
    return completeSensedTime
  }
)

const sensedTimesSlice = createSlice({
  name: 'sensedTimes',
  initialState,
  reducers: {
    sensedTimesCleared: state => {
      state.sensedTimes = {
        byTargetTime: {},
        allTargetTimes: []
      }
      state.status = RequestStatus.Idle
    }
  },
  extraReducers: {
    [fetchSensedTimes.pending]: (state, action) => {
      state.status = RequestStatus.Pending
    },
    // PAYLOAD FORMAT:
    // [ {id: 'abc', targetTime: 1, actualTime: 0.89} ]
    [fetchSensedTimes.fulfilled]: (state, action) => {
      state.status = RequestStatus.Succeeded
      const sensedTimes = {
        byTargetTime: {},
        allTargetTimes: []
      }

      for (let sensedTime of action.payload) {
        const { id, targetTime } = sensedTime
        if (!(targetTime in sensedTimes.byTargetTime)) {
          sensedTimes.byTargetTime[targetTime] = {
            byId: {},
            allIds: []
          }
          sensedTimes.allTargetTimes.push(targetTime)
        }

        if (!(id in sensedTimes.byTargetTime[targetTime].byId)) {
          sensedTimes.byTargetTime[targetTime].allIds.push(id)
        }
        sensedTimes.byTargetTime[targetTime].byId[id] = sensedTime
      }

      state.sensedTimes = { ...sensedTimes }
    },
    [fetchSensedTimes.rejected]: (state, action) => {
      state.status = RequestStatus.Failed
      state.error = action.error.message
    },
    [addSensedTime.fulfilled]: (state, action) => {
      const sensedTime = action.payload
      const targetTime = sensedTime.targetTime
      if (!(targetTime in state.sensedTimes)) {
        state.sensedTimes[targetTime] = [sensedTime]
      } else {
        state.sensedTimes[targetTime].push(sensedTime)
      }
    }
  }
})

export const { sensedTimesCleared } = sensedTimesSlice.actions

export const selectSensedTimeByTargetTimeAndId = (state, targetTime, id) => {
  const sensedTimes = state.sensedTimes.sensedTimes
  console.log(sensedTimes)
  const sensedTimesByTargetTime = sensedTimes.byTargetTime[targetTime]
  console.log(sensedTimesByTargetTime, targetTime)
  const sensedTimesByTargetTimeById = sensedTimesByTargetTime.byId[id]
  console.log(sensedTimesByTargetTimeById, id)
  return sensedTimesByTargetTimeById
}

export const selectSensedTimeIdsByTargetTime = state => {
  const allSensedTimes = state.sensedTimes.sensedTimes

  const sensedTimesByTargetTime = Object.entries(allSensedTimes.byTargetTime)
  if (!sensedTimesByTargetTime || sensedTimesByTargetTime.length === 0) {
    return {}
  }

  const reducer = (sensedTimeIdsByTargetTime, [targetTime, sensedTimes]) => {
    sensedTimeIdsByTargetTime[targetTime] = sensedTimes.allIds
    return sensedTimeIdsByTargetTime
  }

  const results = sensedTimesByTargetTime.reduce(reducer, {})

  return results
}

export const selectSensedTimesStatus = state => state.sensedTimes.status

export default sensedTimesSlice.reducer
