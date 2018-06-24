import { USER_LOGGED_IN } from '../actions/ActionTypes'

const initialState = {
  user: {
    id: '',
    name: ''
  },
  token: ''
}

export const authReducer = ( state = initialState, action ) => {
  switch(action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        user: action.user,
        token: action.token
      }
    default:
      return state
  }
}
