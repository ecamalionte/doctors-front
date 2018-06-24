import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'

class LoginForm extends Component {
  state = {
    errors: {},
    data: {
      login: '',
      password: ''
    },
    loading: false,
  }

  onSubmit = () => {
    const errors = this.validate(this.state.data)
    this.setState({errors})

    if(Object.keys(errors).length === 0 )
      this.props.submit(this.state.data)
      .catch(
        err => this.setState(
          { errors: { ...err.response.data.errors, global: 'Falha no login!' } }
        )
      )
  }

  validate = data => {
    const errors = {}

    if(!data.login.length) errors.login = "Can't be blank"
    if(!data.password.length) errors.password = "Can't be blank"

    return errors
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    })

  render() {
    const { data, errors } = this.state

    return(
      <div>
        { errors.global &&
        <Message attached='top' negative>
          <Icon name='exclamation circle' />
          { errors.global }
        </Message>
        }
        <Form onSubmit={this.onSubmit} size='large' className='attached'>
          <Segment stacked>
            <Form.Input
              error={!!errors.login}
              fluid
              icon='user'iconPosition='left'
              type='text'
              id='login'
              name='login'
              placeholder='Usuário'
              value={data.login}
              onChange={this.onChange} />

            <Form.Input
              error={!!errors.password}
              fluid
              icon='lock'
              iconPosition='left'
              type='password'
              id='password'
              name='password'
              placeholder='Senha'
              value={data.password}
              onChange={this.onChange} />

            <Button color={this.props.color} fluid size='large'>Login</Button>
          </Segment>
        </Form>
      </div>
      )
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired
}

export default LoginForm
