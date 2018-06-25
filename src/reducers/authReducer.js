import { USER_LOGGED_IN } from '../actions/ActionTypes'

const initialState = {
  user: {
    id: '',
    name: ''
  },
  token: null
}

export const authReducer = ( state = initialState, action ) => {
  switch(action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}
