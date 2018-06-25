import React from 'react'
import { Route } from 'react-router-dom'

import AuthRoute from './routes/AuthRoute'
import GuestRoute from './routes/GuestRoute'

import ChatPage from './components/pages/ChatPage'
import LoginPage from './components/pages/LoginPage'

import PropTypes from 'prop-types'

const App = ({location}) => (
  <div>
    <AuthRoute path='/chat' exact component={ChatPage} location={location} />
    <GuestRoute path='/login' exact component={LoginPage} location={location} />

    <Route path='/' exact render={ () => ( <div> <p>Wellcome</p> <ul> <li> <a href='/login'>Login</a> </li> <li> <a href='/chat'>Chat</a> </li> </ul> </div> ) } location={location} />
  </div>
  )


App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}
export default App
