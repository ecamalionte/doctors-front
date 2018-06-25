import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  SET_AUTH_TOKEN
} from '../actions/ActionTypes'

const initialState = {
  user: {
    id: 0,
    name: ''
  },
  token: null
}

export const authReducer = ( state = initialState, action ) => {
  switch(action.type) {
    case USER_LOGGED_OUT:
      return initialState
    case USER_LOGGED_IN:
      return {
        ...state,
        ...action.data
      }
    case SET_AUTH_TOKEN:
      return {
        ...state,
        token: action.token
      }
    default:
      return state
  }
}
