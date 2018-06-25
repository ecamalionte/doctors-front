import { USER_LOGGED_IN } from './ActionTypes'
import Api from '../Api.js'


export const userLoggedIn = data => ({
  type: USER_LOGGED_IN,
  data
})

export const login = credentials => dispatch =>
  Api.user.login(credentials)
  .then(
    auth => dispatch(userLoggedIn(auth.data))
  )
