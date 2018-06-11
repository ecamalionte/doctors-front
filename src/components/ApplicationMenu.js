import React from 'react'
import {
  Container,
  Image,
  Menu,
} from 'semantic-ui-react'

const ApplicationMenu = () => (
  <Menu fixed='top' inverted>
    <Container>
      <Menu.Item as='a' header>
        <Image size='mini' src='http://www.consete.com.br/wp-content/uploads/2018/05/icone-medicina-trabalho.png' style={{ marginRight: '1.5em'  }} />
        Doctors Chat
      </Menu.Item>
      <Menu.Item as='a'>Chat</Menu.Item>
    </Container>
  </Menu>
)

export default ApplicationMenu
