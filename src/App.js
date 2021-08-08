import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

const PastSensedTimes = () => (
  <ol id="pastTimesList"></ol>
)

const AverageSensedTime = () => (
  <>
    <button id="toggleAverage" style={{backgroundColor: "darkslategrey"}}>Average</button>
    <div id="average" style={{visibility: "hidden"}}>
        <label>Average Target Time:</label><p id="averageTargetTime"></p>
        <label>Average Actual Time:</label><p id="averageActualTime"></p>
    </div>
  </>
)

const useInput =({ type, value }) => {
  const [inputValue, setInputValue] = useState(value);
  const input = <input value={inputValue} onChange={e => setInputValue(e.target.value)} type={type} />;
  return [inputValue, input];
}

const TimeSensorState = {
  Ready: 'Ready',
  Started: 'Started',
  Stopped: 'Stopped '
}

const TimeSensor = ({onTimeSensed}) => {
  const [timeSensorState, setTimeSensorState] = useState(TimeSensorState.Ready);
  const [timeSensorButtonText, setTimeSensorButtonText] = useState('Start')
  const [timeSensorButtonBackgroundColor, setTimeSensorButtonBackgroundColor] = useState('limegreen')
  const [actualSensedTime, setActualSensedTime] = useState(0)
  const [startSensedTime, setStartSensedTime] = useState(0)
  const [stopSensedTime, setStopSensedTime] = useState(0)
  const [sensedTimeVisibility, setSensedTimeVisibility] = useState('hidden')

  const [targetSensedTime, targetSensedTimeInput] = useInput({type: 'number', value: '0'})

  console.log('Function Running')

  const timeSensorActions = {
    [TimeSensorState.Ready]: () => {
      setTimeSensorState(TimeSensorState.Started)
      setTimeSensorButtonText('Stop')
      setTimeSensorButtonBackgroundColor('tomato')
      setStartSensedTime(Date.now())
    },
    [TimeSensorState.Started]: () => {
      setTimeSensorState(TimeSensorState.Stopped)
      setTimeSensorButtonBackgroundColor('mediumaquamarine')
      setTimeSensorButtonText('Reset')
      setStopSensedTime(Date.now())
      console.log('stopSensedTime', stopSensedTime)
      console.log('startSensedTime', startSensedTime)
      const actualTime = (stopSensedTime - startSensedTime) / 1000
      console.log('actualTime', actualTime)
      setActualSensedTime(actualTime)
      setSensedTimeVisibility('visible')
    },
    [TimeSensorState.Stopped]: () => {
      const targetTime = parseInt(targetSensedTime)
      onTimeSensed({ targetTime, actualTime: actualSensedTime })
      setTimeSensorState(TimeSensorState.Ready)
      setSensedTimeVisibility('hidden')
      setTimeSensorButtonText('Start')
      setTimeSensorButtonBackgroundColor('limegreen')
    }
  }

  return (
    <>
      {targetSensedTimeInput}
      <button
        style={{backgroundColor: timeSensorButtonBackgroundColor}}
        onClick={() => timeSensorActions[timeSensorState]()}
      >
        {timeSensorButtonText}
      </button>
      <p>Start Sensed Time: '{startSensedTime}'</p>
      <p>Stop Sensed Time: '{stopSensedTime}'</p>
      <p style={{visibility: sensedTimeVisibility}}>{(actualSensedTime)}</p>
    </>
  )
  }

const Dashboard = () => (
  <div id="dashboard">
    <PastSensedTimes></PastSensedTimes>
    <AverageSensedTime></AverageSensedTime>
    <TimeSensor onTimeSensed={(sensedTime) => console.log(sensedTime)}></TimeSensor>
  </div>
)

const App = () => (
  <div className="container">
    <header className="logo">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>TimeSense</h1>
    </header>
    <div className="main">
      <Dashboard></Dashboard>
    </div>
  </div>
)

export default App;
