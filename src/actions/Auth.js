import { USER_LOGGED_IN, USER_LOGGED_OUT, SET_AUTH_TOKEN } from './ActionTypes'
import Api from '../Api.js'

import Auth from '../Auth'

export const userLoggedIn = data => ({
  type: USER_LOGGED_IN,
  data
})

export const userLogOut = () => ({
  type: USER_LOGGED_OUT
})

export const setAuthToken = token => ({
  type: SET_AUTH_TOKEN,
  token
})

export const login = credentials => dispatch =>
  Api.user.login(credentials)
  .then(
    auth => {
      Auth.storeToken(auth.data.token)
      dispatch(userLoggedIn(auth.data))
    }
  )

export const logout = () => dispatch => {
  Auth.removeToken()
  dispatch(userLogOut())
}

export const getAuthByToken = (token, user_id) => dispatch =>
  Api.user.authByToken(token, user_id).then(
    auth => {
      Auth.storeToken(token)
      dispatch(userLoggedIn(auth.data))
    }
  )
