import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import useInput from '../../hooks/useInput'
import { sensedTimeAdded } from '../metrics/metricsSlice'
import { addSensedTime } from '../sensed-times/sensedTimesSlice'

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
    initialValue: '0',
    className: 'center-horizontally',
    min: 0
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
      dispatch(addSensedTime({ targetTime, actualTime: actualSensedTime }))
        .unwrap()
        .catch(err => {
          console.error('Failed to save the sensed time: ', err)
        })
      dispatch(sensedTimeAdded())
    }
  }

  return (
    <div className='center'>
      <div className='grid'>
        <label>
          <span>Target Time (Seconds): </span>
          {targetSensedTimeInput}
        </label>
        <button
          className='center-horizontally'
          style={{ backgroundColor: timeSensorButtonBackgroundColor }}
          onClick={() => timeSensorActions[timeSensorState]()}
        >
          {UpdatedTimeSensorButtonText[timeSensorState]}
        </button>
        {displaySensedTime && (
          <p className='center-align'>Actual Time: {actualSensedTime}</p>
        )}
      </div>
    </div>
  )
}

export default TimeSensor
