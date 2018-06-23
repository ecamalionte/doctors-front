import React, { Component } from 'react'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAPIMessage } from '../actions/Api'

import ApplicationAlertMessage from './ApplicationAlertMessage'

class APIMessage extends Component {

  componentWillMount(){ this.props.fetchAPIMessage() }

  render() {
    const { api_connection } = this.props

    let message_props = {
      title: 'API Connection',
      message: api_connection.message,
      status: api_connection.status
    }

    return(<ApplicationAlertMessage { ...message_props }/>)
  }

}

const mapStateToProps = store => ({ api_connection: store.getAPIMessage.api_connection })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchAPIMessage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(APIMessage)
