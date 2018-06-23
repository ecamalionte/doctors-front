import React from 'react'

import { Container } from 'semantic-ui-react'

import ApplicationMenu from '../ApplicationMenu'
import ApplicationFooter from '../ApplicationFooter'

import Chat from '../Chat'
import APIMessage from '../messages/APIMessage'

const ChatPage = () => {
  return(
    <div>
      <ApplicationMenu/>

      <Container style={{ marginTop: '7em' }}>
        <APIMessage />
        <Chat />
      </Container>

      <ApplicationFooter/>
    </div>
    )
}

export default ChatPage
