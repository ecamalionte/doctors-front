import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './components/Chat.js';

class App extends Component {

    constructor(){
        super();
        this.state = { backend_connection: ''};
    }

    componentWillMount(){
        let url = 'http://localhost:4000/api';

        fetch(url)
            .then(response => { return response.json(); } )
            .then(json => { this.setState({backend_connection: json.data }); } )
            .catch(error => { console.log(error); });
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Doctors Front Application</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
            Start the backend <code>doctors_api/ mix phoenix.server</code> on localhost:4000
        </p>

        <p className="App-intro">
            Backend Connection Message:
            <span className="Connection-ok">
            { this.state.backend_connection }
            </span>
        </p>

        <Chat/>
      </div>

    );
  }
}

export default App;
