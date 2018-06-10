import React, { Component } from 'react';
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
      .then(json => { this.setState({backend_connection: json.data }) } )
      .catch(error => { console.log(error); });
  }

  render() {
    return (
      <div className="App">
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
