import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import ChatPage from './components/pages/ChatPage'

class App extends Component {

  render() {

    return (
      <div>
        <Route path='/chat' exact component={ChatPage} />
        <Route path='/' render={ () => {return("Wellcome to home page")} } />
      </div>
      );
  }
}

export default App
