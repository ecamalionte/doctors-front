import { USER_LOGGED_IN } from './ActionTypes'
import Api from '../Api.js'


export const userLoggedIn = auth_data => ({
  type: USER_LOGGED_IN,
  auth_data
})

export const login = credentials => dispatch =>
  Api.user.login(credentials)
  .then(
    auth_data => dispatch(userLoggedIn(auth_data.data))
  )
