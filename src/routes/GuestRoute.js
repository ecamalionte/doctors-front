import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


const GuestRoute = ({isAuthenticated, component: Component, ...rest}) => (
  <Route
    { ...rest }
    render={ props => ! isAuthenticated ? <Component { ...props }/> : <Redirect to='/' /> } />
)


GuestRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(GuestRoute)
