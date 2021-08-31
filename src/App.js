import logo from './logo.svg'
import './App.css'
import React from 'react'

import { Dashboard } from './app/Dashboard'
import Amplify, { Auth } from 'aws-amplify'

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-2:c346a28f-75f7-43b1-82c5-7f21b366fe13',
    region: 'us-east-2',
    userPoolId: 'us-east-2_aXciLqWGq',
    userPoolWebClientId: 'ilnugc8om6hkk147inavg57t6'
  },
  API: {
    endpoints: [
      {
        name: 'TimeSenseApiTest',
        endpoint: 'https://df7tqt6gnf.execute-api.us-east-2.amazonaws.com/test'
      }
    ]
  }
})

// You can get the current config object
const currentConfig = Auth.configure()

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
