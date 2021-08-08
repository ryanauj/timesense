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

const UpdatedTimeSensorButtonText = {
  [TimeSensorState.Ready]: 'Start',
  [TimeSensorState.Started]: 'Stop',
  [TimeSensorState.Stopped]: 'Reset'
}

const TimeSensor = ({onTimeSensed}) => {
  const [timeSensorState, setTimeSensorState] = useState(TimeSensorState.Ready);
  const [timeSensorButtonBackgroundColor, setTimeSensorButtonBackgroundColor] = useState('limegreen')
  const [startSensedTime, setStartSensedTime] = useState(0)
  const [actualSensedTime, setActualSensedTime] = useState(0)
  const [displaySensedTime, setDisplaySensedTime] = useState(false)
  const [targetSensedTime, targetSensedTimeInput] = useInput({type: 'number', value: '0'})

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
      onTimeSensed({ targetTime, actualTime: actualSensedTime })
      setTimeSensorState(TimeSensorState.Ready)
      setDisplaySensedTime(false)
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
        {UpdatedTimeSensorButtonText[timeSensorState]}
      </button>
      {displaySensedTime && <p>{(actualSensedTime)}</p>}
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
