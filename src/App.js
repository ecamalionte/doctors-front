import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import { Route } from 'react-router-dom'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAPIMessage } from './actions/Api'

import ApplicationMenu from './components/ApplicationMenu'
import ApplicationFooter from './components/ApplicationFooter'
import ApplicationAlertMessage from './components/ApplicationAlertMessage'
import Chat from './components/Chat'

class App extends Component {

  componentWillMount(){
    this.props.fetchAPIMessage();
  }

  render() {

    const { api_connection } = this.props

    let message_props = {
      title: 'API Connection',
      message: api_connection.message,
      status: api_connection.status
    }

    return (
      <div>
        <ApplicationMenu/>
        <Container style={{ marginTop: '7em'  }}>
          <ApplicationAlertMessage {...message_props}/>


          <Route path='/chat' exact component={Chat}/>

        </Container>

        <ApplicationFooter/>
      </div>
      );
  }
}

const mapStateToProps = store => ({ api_connection: store.getAPIMessage.api_connection })

const mapDispatchToProps = dispatch => bindActionCreators({ fetchAPIMessage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
