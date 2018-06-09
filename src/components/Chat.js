import React, { Component } from 'react';
import { Socket } from 'phoenix';
import UserMessage from './UserMessage.js';
import ServerMessage from './ServerMessages.js';

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
        const userMessages = this.state.userMessages.map((message, index) =>
            <UserMessage key={index}
                         username= {"GenericUser"}
                         message={message} />
         );

        const serverMessages = this.state.serverMessages.map((message, index) =>
                                                             <ServerMessage key = { index }
                                                             username = { "Server" }
                                                             message = { message } />);

        return (
         <div className="App">
           <h1> Instant Message </h1>

           {userMessages}
           {serverMessages}

           <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                   <div className="field">
                     <label className="label"style={{ textAlign: "left" }}>
                     GenericUsername:
                     </label>

                     <div className="control">
                         <input className="input" type="text" style={{ marginTop: "10px"}} value={this.state.inputMessage } onChange={ this.handleInputMessage.bind(this) } />
                     </div>
                   </div>

                   <button type="submit" value="Submit" className="button is-primary" style={{ marginTop: "10px" }} >
                    Send Message
                   </button>
                </form>
           </div>


         </div>
        );
    }
}

export default Chat;
