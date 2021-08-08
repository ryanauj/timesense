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
        <label for="averageTargetTime">Average Target Time:</label><p id="averageTargetTime"></p>
        <label for="averageActualTime">Average Actual Time:</label><p id="averageActualTime"></p>
    </div>
  </>
)

const TimeSensorState = {
  Ready: 'Ready',
  Started: 'Started',
  Stopped: 'Stopped '
}

const useInput =({ type, value }) => {
  const [inputValue, setInputValue] = useState(value);
  const input = <input value={inputValue} onChange={e => setInputValue(e.target.value)} type={type} />;
  return [inputValue, input];
}

const TimeSensor = () => {
  const [timeSensorState, setTimeSensorState] = useState(TimeSensorState.Ready);
  const [actualSensedTime, setActualSensedTime] = useState(0)
  const [startSensedTime, setStartSensedTime] = useState(0)
  const [stopSensedTime, setStopSensedTime] = useState(0)
  const [targetSensedTime, targetSensedTimeInput] = useInput({type: 'number', value: '0'})

  return (
    <>
      {targetSensedTimeInput}
      <button id="timeSensorButton" style={{backgroundColor: "4caf50"}}>Start</button>
      <p id="sensedTime" style={{visibility: "hidden"}}></p>
    </>
  )
  }

const Dashboard = () => (
  <div id="dashboard">
    <PastSensedTimes></PastSensedTimes>
    <AverageSensedTime></AverageSensedTime>
    <TimeSensor></TimeSensor>
  </div>
)

const App = () => (
  <body className="container">
    <header className="logo">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>TimeSense</h1>
    </header>
    <div className="main">
      <Dashboard></Dashboard>
    </div>
  </body>
)

export default App;
