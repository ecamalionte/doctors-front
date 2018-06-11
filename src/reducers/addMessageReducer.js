import { ADD_USER_MESSAGE, ADD_SERVER_MESSAGE } from '../actions/ActionTypes'

const initialState = {
  inputMessage: '',
  userMessages: [],
  serverMessages: []
}

export const addMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_MESSAGE:
      return {
        ...state,
        userMessages: state.userMessages.concat(action.message)
      }
    case ADD_SERVER_MESSAGE:
      return {
        ...state,
        serverMessages: state.serverMessages.concat(action.message)
      }
    default:
      return state;
  }
}
