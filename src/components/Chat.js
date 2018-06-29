import React, { Component } from 'react';
import { Feed, Grid, Button, TextArea, Form, Segment } from 'semantic-ui-react'
import IsTyping from './IsTyping'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  addUserMessage,
  addServerMessage,
  fetchUserChannels
} from '../actions/Chat'

import ChatSocket from '../ChatSocket'

class Chat extends Component {

  constructor(props){
    super(props)
    this.state = { inputMessage: '', ready: false }

    this.props.fetchUserChannels(this.props.user.id)
      .then(
        () => {
          this.socket = new ChatSocket(this.props.user, this.props.user_channels)
          this.socket.handleServerMessage(this.handleServerMsg)
          this.setState({ready: true})
        }
      )
  }

  handleServerMsg = (data) => {
    data.user.id !== this.props.user.id && this.props.addServerMessage(data)
  }

  handleSubmit(event){
    event.preventDefault()
    let message = { user: this.props.user, body: this.state.inputMessage }

    this.socket.pushMessage(message)
    this.props.addUserMessage(message)

    this.setState({ inputMessage: "" })
  }

  handleInputMessage(event){
    this.setState({inputMessage: event.target.value})
    this.socket.pushTyping({ user: this.props.user })
  }

  render() {

    if(!this.props.user_channels.length || !this.state.ready)
      return <div />

    let { serverMessages, userMessages, user } = this.props

    let server_events = serverMessages.map(message => (
      {
        image: 'https://semantic-ui.com/images/avatar/small/elliot.jpg',
        summary: message.user.name,
        extraText: message.body,
        meta: (new Date()).toLocaleDateString()
      }
    ))

    let user_events = userMessages.map(message => (
      {
        image: 'https://semantic-ui.com/images/avatar/small/justen.jpg',
        summary: message.user.name,
        extraText: message.body,
        meta: (new Date()).toLocaleDateString()
      }
    ))

    let feed_events = user_events.concat(server_events)

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <h1> Instant Message </h1>

            <Feed events={feed_events} />

            <Segment>
              <IsTyping socket={this.socket} user={this.props.user} />
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Field
                  control={TextArea}
                  label={`${ user.name }:`}
                  value={this.state.inputMessage }
                  onChange={ this.handleInputMessage.bind(this) } />
                <Button type='submit'>Submit</Button>
              </Form>
            </Segment>

          </Grid.Column>
        </Grid.Row>
      </Grid>
      )
    }
  }

const mapStateToProps = store => ({
  userMessages: store.chat.userMessages,
  serverMessages: store.chat.serverMessages,
  user: store.auth.user,
  user_channels: store.chat.user.channels
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addUserMessage,
    addServerMessage,
    fetchUserChannels
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
