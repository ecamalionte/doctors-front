import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { getAuthByToken, logout } from '../actions/Auth'

import Auth from '../Auth'

class AuthRoute extends Component {

  state = { ready: false }

  getUserData = () => {
    this.props.getAuthByToken(Auth.storagedToken(), Auth.user_id())
      .then( data => this.setState({ ready: true }) )
      .catch( err => {
        this.props.logout()
        this.setState({ ready: false, error: 'getUserData' })
      } )
  }

  needGetUserData = () => (!this.props.user.id || !this.props.user.name)

  checkPath = () => (this.props.path === this.props.location.pathname)

  render () {
    if(!this.checkPath())
      return <div />

    if(!this.props.isAuthenticated)
      return <Redirect to='/login' />

    let {
      component: ComponentToRender,
      isAuthenticated,
      user,
      getAuthByToken,
      logout,
      ...rest
    } =  this.props

    if(this.needGetUserData())
      this.getUserData()

    if(this.state.ready)
      return <Route { ...rest } render={ props => <ComponentToRender { ...props }/> } />

      return <div />
    }
}


AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  getAuthByToken: PropTypes.func.isRequired,
  component: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthenticated: !!state.auth.token
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAuthByToken, logout }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute)
