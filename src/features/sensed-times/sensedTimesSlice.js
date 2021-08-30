import { createEntityAdapter, createSlice, nanoid } from '@reduxjs/toolkit'

const sensedTimesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = sensedTimesAdapter.getInitialState()

const sensedTimesSlice = createSlice({
  name: 'sensedTimes',
  initialState,
  reducers: {
    sensedTimeAdded: (state, action) => {
      const sensedTime = {
        ...action.payload,
        id: nanoid(),
        date: new Date().toISOString()
      }
      sensedTimesAdapter.addOne(state, sensedTime)
    }
  }
})

export const { sensedTimeAdded } = sensedTimesSlice.actions

export const {
  selectById: selectSensedTimeById,
  selectIds: selectSensedTimeIds
} = sensedTimesAdapter.getSelectors(state => state.sensedTimes)

export default sensedTimesSlice.reducer
