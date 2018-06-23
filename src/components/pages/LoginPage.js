import React, { Component } from 'react'

import { Grid, Header, Image, Message } from 'semantic-ui-react'
import LoginForm from '../forms/LoginForm'

class LoginPage extends Component {

  submit = (data) => console.log(data)

  render() {
    return(
      <div className='login-form'>
        <style> {'body > div, body > div > div, body > div > div > div.login-form {height: 100%} body { background-color: #f7f7f7 }'}</style>

        <Grid textAlign='center' style={{ height: '100%'  }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450  }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='http://www.consete.com.br/wp-content/uploads/2018/05/icone-medicina-trabalho.png' /> Log-in to your account
            </Header>

            <LoginForm submit={this.submit} color='teal'/>

            <Message>
              Não possui conta? <a href='#login'>Registre-se</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
      )
  }
}

export default LoginPage
