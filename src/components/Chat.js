import React, { Component } from 'react';
import { Socket } from 'phoenix';
import { Feed, Grid, Button, TextArea, Form  } from 'semantic-ui-react'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUserMessage, addServerMessage } from '../actions/Chat'

class Chat extends Component {

  constructor(){
    super()
    this.state = { inputMessage: '', user_id: randomId() }

    let url = "ws://localhost:4000/socket"
    let socket = new Socket(url, {params: {token: window.userToken}})

    socket.connect()

    this.channel = socket.channel("room:lobby", {})

    this.channel.join()
      .receive("ok", response => { console.log("Joined successfully", response); })

    this.channel.on("new_message", payload => {
      if(payload.user_id != this.state.user_id){
        this.props.addServerMessage(payload.body)
      }
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let message = { user_id: this.state.user_id, body: this.state.inputMessage }

    this.channel.push("new_message", message)
    this.props.addUserMessage(message.body)

    this.setState({ inputMessage: "" })
  }

  handleInputMessage(event){
    this.setState({inputMessage: event.target.value})
  }

  render() {

    let { serverMessages, userMessages } = this.props

    let server_events = serverMessages.map(message => (
      {
        image: 'https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg',
        summary: 'Server',
        extraText: message,
        meta: (new Date).toLocaleDateString()
      }
    ))

    let user_events = userMessages.map(message => (
      {
        image: 'https://react.semantic-ui.com/assets/images/avatar/small/justen.jpg',
        summary: 'GenericUsername',
        extraText: message,
        meta: (new Date).toLocaleDateString()
      }
    ))

    let feed_events = user_events.concat(server_events)

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <h1> Instant Message </h1>

            <Feed events={feed_events} />

            <div>
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Field
                  control={TextArea}
                  label='GenericUsername:'
                  value={this.state.inputMessage }
                  onChange={ this.handleInputMessage.bind(this) }
                />
                <Button type='submit'>Submit</Button>
              </Form>
            </div>

          </Grid.Column>
        </Grid.Row>
      </Grid>

      );
    }
  }

const randomId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const mapStateToProps = store => ({
  userMessages: store.chatReducer.userMessages,
  serverMessages: store.chatReducer.serverMessages
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addUserMessage,
    addServerMessage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
