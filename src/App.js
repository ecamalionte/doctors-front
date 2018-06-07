import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state = { backend_connection: '' };
    }

    componentWillMount(){
        let url = 'http://localhost:4000/api';
        let options = {
            mode: 'cors',
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            contentType: 'application/json'
        };

        fetch(url, options)
            .then(response => { console.log(response);})
            .catch(error => {console.log(error);});

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
            The next step will be start the backend <code>../doctors-api/ mix phoenix.server</code> on localhost:4000 and fetch information
        </p>

        <p className="App-intro">
            {this.state.backend_connection}
        </p>
      </div>
    );
  }
}

export default App;
