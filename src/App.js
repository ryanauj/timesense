import logo from './logo.svg'
import './App.css'
import React from 'react'
import TimeSensor from './features/time-sensor/TimeSensor'
import { useSelector } from 'react-redux'
import {
  selectSensedTimeById,
  selectSensedTimeIds
} from './features/sensed-times/sensedTimesSlice'

const PastSensedTime = ({ sensedTimeId }) => {
  const sensedTime = useSelector(state =>
    selectSensedTimeById(state, sensedTimeId)
  )
  return (
    <li key={sensedTimeId}>
      <p>
        <label>Target Time: </label>
        <span>{sensedTime.targetTime}</span>
      </p>
      <p>
        <label>Actual Time: </label>
        <span>{sensedTime.actualTime}</span>
      </p>
    </li>
  )
}

const PastSensedTimes = () => {
  const sensedTimeIds = useSelector(selectSensedTimeIds)
  const pastSensedTimes = sensedTimeIds.map(sensedTimeId => (
    <PastSensedTime sensedTimeId={sensedTimeId}></PastSensedTime>
  ))
  return <ol id='pastTimesList'>{pastSensedTimes}</ol>
}

const AverageSensedTime = () => (
  <>
    <button id='toggleAverage' style={{ backgroundColor: 'darkslategrey' }}>
      Average
    </button>
    <div id='average' style={{ visibility: 'hidden' }}>
      <label>Average Target Time:</label>
      <p id='averageTargetTime'></p>
      <label>Average Actual Time:</label>
      <p id='averageActualTime'></p>
    </div>
  </>
)

const Dashboard = () => (
  <div id='dashboard'>
    <PastSensedTimes></PastSensedTimes>
    <AverageSensedTime></AverageSensedTime>
    <TimeSensor></TimeSensor>
  </div>
)

const App = () => (
  <div className='container'>
    <header className='logo'>
      <img src={logo} className='App-logo' alt='logo' />
      <h1>TimeSense</h1>
    </header>
    <div className='main'>
      <Dashboard></Dashboard>
    </div>
  </div>
)

export default App
