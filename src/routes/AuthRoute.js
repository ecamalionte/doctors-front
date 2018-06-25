import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { getAuthByToken, logout } from '../actions/Auth'

import Auth from '../Auth'

const AuthRoute = ({isAuthenticated, user, getAuthByToken, logout, component: Component, ...rest}) => {

  if(needGetUserData(user))
    getAuthByToken(Auth.storagedToken).catch( err => logout() )

  return <Route
    { ...rest }
    render={ props => isAuthenticated ? <Component { ...props }/> : <Redirect to='/login' /> } />
}

const needGetUserData = (user) => (!user.id || !user.name)

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
