import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import ApplicationMenu from './components/ApplicationMenu'
import ApplicationFooter from './components/ApplicationFooter'
import ApplicationAlertMessage from './components/ApplicationAlertMessage'
import Chat from './components/Chat'

class App extends Component {

  constructor(){
    super();
    this.state = {
      api_connection: {}
    };
  }

  componentWillMount(){
    let url = 'http://localhost:4000/api'

    fetch(url)
      .then(response => { return response.json() })
      .then(json => { this.setState({ api_connection: { message: json.data, status: 'success' } }) })
      .catch(error => { this.setState({ api_connection: { message: error.message, status: 'error' } }) })
  }

  render() {

    let message_props = {
      title: 'API Connection',
      message: this.state.api_connection.message,
      status: this.state.api_connection.status
    }

    return (
      <div>
        <ApplicationMenu/>

        <Container style={{ marginTop: '7em'  }}>
          <ApplicationAlertMessage {...message_props}/>
          <Chat/>
        </Container>

        <ApplicationFooter/>
      </div>
      );
  }
}

export default App;
