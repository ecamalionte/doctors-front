import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import ChatPage from './components/pages/ChatPage'
import LoginPage from './components/pages/LoginPage'

class App extends Component {

  render() {

    return (
      <div>

        <Route path='/chat' exact component={ChatPage} />
        <Route path='/login' exact component={LoginPage} />

        <Route path='/' exact
          render={
            () => {
              return(
              <div>
                <p>Wellcome</p>
                <ul>
                  <li>
                    <a href='/login'>Login</a>
                  </li>
                  <li>
                    <a href='/chat'>Chat</a>
                  </li>
                </ul>
              </div>

              )
            }
          }
        />
      </div>
      );
  }
}

export default App
