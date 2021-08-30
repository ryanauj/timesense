import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import useInput from '../../hooks/useInput'
import { sensedTimeAdded } from '../sensed-times/sensedTimesSlice'

const TimeSensorState = {
  Ready: 'Ready',
  Started: 'Started',
  Stopped: 'Stopped '
}

const UpdatedTimeSensorButtonText = {
  [TimeSensorState.Ready]: 'Start',
  [TimeSensorState.Started]: 'Stop',
  [TimeSensorState.Stopped]: 'Reset'
}

const TimeSensor = () => {
  const dispatch = useDispatch()

  const [timeSensorState, setTimeSensorState] = useState(TimeSensorState.Ready)
  const [timeSensorButtonBackgroundColor, setTimeSensorButtonBackgroundColor] =
    useState('limegreen')
  const [startSensedTime, setStartSensedTime] = useState(0)
  const [actualSensedTime, setActualSensedTime] = useState(0)
  const [displaySensedTime, setDisplaySensedTime] = useState(false)
  const [targetSensedTime, targetSensedTimeInput] = useInput({
    type: 'number',
    value: '0'
  })

  console.log('Function Running')

  const timeSensorActions = {
    [TimeSensorState.Ready]: () => {
      setTimeSensorState(TimeSensorState.Started)
      setTimeSensorButtonBackgroundColor('tomato')
      setStartSensedTime(Date.now())
    },
    [TimeSensorState.Started]: () => {
      setTimeSensorState(TimeSensorState.Stopped)
      setTimeSensorButtonBackgroundColor('mediumaquamarine')
      const stopSensedTime = Date.now()
      const actualTime = (stopSensedTime - startSensedTime) / 1000
      setActualSensedTime(actualTime)
      setDisplaySensedTime(true)
    },
    [TimeSensorState.Stopped]: () => {
      const targetTime = parseInt(targetSensedTime)
      setTimeSensorState(TimeSensorState.Ready)
      setDisplaySensedTime(false)
      setTimeSensorButtonBackgroundColor('limegreen')
      dispatch(sensedTimeAdded({ targetTime, actualTime: actualSensedTime }))
    }
  }

  return (
    <>
      {targetSensedTimeInput}
      <button
        style={{ backgroundColor: timeSensorButtonBackgroundColor }}
        onClick={() => timeSensorActions[timeSensorState]()}
      >
        {UpdatedTimeSensorButtonText[timeSensorState]}
      </button>
      {displaySensedTime && <p>{actualSensedTime}</p>}
    </>
  )
}

export default TimeSensor
