import { USER_LOGGED_IN } from '../actions/ActionTypes'

const initialState = {
  auth_data: {
    user: {
      id: '',
      name: ''
    },
    token: ''
  }
}

export const authReducer = ( state = initialState, action ) => {
  switch(action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        auth_data: action.auth_data
      }
    default:
      return state
  }
}
