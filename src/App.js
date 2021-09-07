import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { Login } from './features/authentication/Login'
import { Signup } from './features/authentication/Signup'
import { Dashboard } from './app/Dashboard'
import Amplify, { Auth } from 'aws-amplify'

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    identityPoolId: 'us-east-2:c346a28f-75f7-43b1-82c5-7f21b366fe13',
    region: 'us-east-2',
    userPoolId: 'us-east-2_9D2sD2SED',
    userPoolWebClientId: '1r1tgqd734fnth6u8fr9gcuh7j'
  },
  API: {
    endpoints: [
      {
        name: 'TimeSenseApiTest',
        endpoint: 'https://df7tqt6gnf.execute-api.us-east-2.amazonaws.com/test',
        region: 'us-east-2'
      }
    ]
  }
})

// You can get the current config object
const currentConfig = Auth.configure()

const App = () => {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
      </Switch>
    </Router>
  )
}

export default App
