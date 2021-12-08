import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import {
  PRIMARY,
  VERY_DARK_BLUE,
  VERY_LIGHT_BLUE
} from '../../constants/cssVars'
import useInput from '../../hooks/useInput'
import { sensedTimeAdded } from '../metrics/metricsSlice'
import { addSensedTime } from '../sensed-times/sensedTimesSlice'
import startIcon from '../../assets/startIcon.svg'
import resetIcon from '../../assets/resetIcon.svg'
import inProgressIcon from '../../assets/inProgressIcon.svg'

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

const TimeSensorIcon = {
  [TimeSensorState.Ready]: startIcon,
  [TimeSensorState.Started]: inProgressIcon,
  [TimeSensorState.Stopped]: resetIcon
}

const Wrapper = styled.div`
  width: min(400px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    padding: 0.7em 0 0.7em 0;
    width: 100%;
    border: 0;
    margin-top: 1em;
    font-size: 1.1em;
    font-weight: 600;
    color: ${VERY_DARK_BLUE};
    background-color: ${PRIMARY};
  }
  > img {
    width: 140px;
    height: 220px;
    path {
      fill: ${VERY_LIGHT_BLUE};
    }
  }
  > p {
    font-weight: 600;
  }
`

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
    <div className='center sensor'>
      <Wrapper>
        <label>
          <span>Target Time (Seconds): </span>
          {targetSensedTimeInput}
        </label>
        <button
          className='center-horizontally cool-button'
          style={{ backgroundColor: timeSensorButtonBackgroundColor }}
          onClick={() => timeSensorActions[timeSensorState]()}
        >
          {UpdatedTimeSensorButtonText[timeSensorState]}
        </button>
        {displaySensedTime && (
          <p className='center-align'>Actual Time: {actualSensedTime}</p>
        )}
        <img src={TimeSensorIcon[timeSensorState]} alt='time-sensor-icon' />
      </Wrapper>
    </div>
  )
}

export default TimeSensor
