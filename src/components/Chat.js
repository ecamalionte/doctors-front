import React, { Component } from 'react';
import { Socket } from 'phoenix';
import { Feed, Grid, Button, TextArea, Form, Segment } from 'semantic-ui-react'
import IsTyping from './IsTyping'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUserMessage, addServerMessage } from '../actions/Chat'

class Chat extends Component {

  constructor(){
    super()
    this.state = { inputMessage: '' }

    let url = "ws://localhost:4000/socket"
    let socket = new Socket(url, {params: {token: window.userToken}})

    socket.connect()

    this.channel = socket.channel("room:lobby", {})

    this.channel.join()
      .receive("ok", response => console.log("Joined successfully", response))

    this.channel.on("new_message", payload => {
      if(payload.user.id !== this.props.user.id)
        this.props.addServerMessage(payload)
    })
  }


  handleSubmit(event){
    event.preventDefault()
    let message = { user: this.props.user, body: this.state.inputMessage }

    this.channel.push("new_message", message)
    this.props.addUserMessage(message)

    this.setState({ inputMessage: "" })
  }

  handleInputMessage(event){
    this.setState({inputMessage: event.target.value})
    let user = { user: this.props.user }
    this.channel.push("typing", user)
  }

  render() {

    let { serverMessages, userMessages, user } = this.props

    let server_events = serverMessages.map(message => (
      {
        image: 'https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg',
        summary: message.user.name,
        extraText: message.body,
        meta: (new Date()).toLocaleDateString()
      }
    ))

    let user_events = userMessages.map(message => (
      {
        image: 'https://react.semantic-ui.com/assets/images/avatar/small/justen.jpg',
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
              <IsTyping channel={this.channel} user={this.props.user} />
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
  userMessages: store.chatReducer.userMessages,
  serverMessages: store.chatReducer.serverMessages,
  user: store.auth.auth_data.user
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addUserMessage,
    addServerMessage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
