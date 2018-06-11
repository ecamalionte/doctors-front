import React from 'react'
import {
  Segment,
  Container,
  Header,
  List,
  Divider,
  Image,
  Menu,
} from 'semantic-ui-react'

const ApplicationFooter = () => (
  <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em'  }}>
    <Container textAlign='center'>
      <Divider inverted section />
      <Image centered size='mini' src='http://www.consete.com.br/wp-content/uploads/2018/05/icone-medicina-trabalho.png' />
      <List horizontal inverted divided link>
        <List.Item as='a' href='#'>
          Site Map
        </List.Item>
        <List.Item as='a' href='#'>
          Contact Us
        </List.Item>
        <List.Item as='a' href='#'>
          Terms and Conditions
        </List.Item>
        <List.Item as='a' href='#'>
          Privacy Policy
        </List.Item>
      </List>
    </Container>
  </Segment>
)

export default ApplicationFooter
