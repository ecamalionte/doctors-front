import React, { Component } from 'react';
import { Socket } from 'phoenix';
import { Feed, Grid, Button, TextArea, Form  } from 'semantic-ui-react'

class Chat extends Component {

  constructor(){
    super();
    this.state = {
      inputMessage: '',
      userMessages: [],
      serverMessages: []
    };

    let url = "ws://localhost:4000/socket";
    let socket = new Socket(url, {params: {token: window.userToken}});

    socket.connect();

    this.channel = socket.channel("room:lobby", {});
    this.channel.join()
      .receive("ok", response => { console.log("Joined successfully", response); });

    this.channel.on("new_message", payload => {
      this.setState({
        serverMessages: this.state.serverMessages.concat(payload.body)
      });
      console.log("server messages: " + this.state.serverMessages);
    });
  }

  handleSubmit(event){
    event.preventDefault();
    this.channel.push("new_message", {body: this.state.inputMessage});
    this.setState({
      userMessages: this.state.userMessages.concat(this.state.inputMessage),
      inputMessage: ""
    });
  }

  handleInputMessage(event){
    this.setState({inputMessage: event.target.value});
  }

  render() {

    let server_events = this.state.serverMessages.map(message => (
      {
        image: 'https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg',
        summary: 'Server',
        extraText: message,
        meta: (new Date).toLocaleDateString()
      }
    ))

    let user_events = this.state.userMessages.map(message => (
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

export default Chat;
