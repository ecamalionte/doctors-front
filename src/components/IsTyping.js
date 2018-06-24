import React, { Component } from 'react'
import { Label } from 'semantic-ui-react'

import PropTypes from 'prop-types'

class IsTyping extends Component {

  state = {
    typingUser: ''
  }

  constructor(props) {
    super(props)

    this.props.channel.on("typing", payload => {
      if(payload.user.id !== this.props.user.id) {
        this.setState({typingUser: payload.user.name})
        this.cleanTypingMessageAfter(4)
      }
    })
  }

  cleanTypingMessageAfter(seconds){
    setTimeout(() => {this.setState({typingUser: ''}) }, seconds * 1000);
  }

  render() {
    if(this.state.typingUser !== '')
      return (
        <Label as='span' color='teal' ribbon='right'>
          {this.state.typingUser}
          <Label.Detail>is typing ...</Label.Detail>
        </Label>
        )

    return(<div style={{ minHeight: '26px' }}><br/></div>)
  }
}

IsTyping.propTypes = {
  channel: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default IsTyping
