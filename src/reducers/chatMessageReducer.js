import {
  ADD_USER_CHANNELS,
  ADD_USER_MESSAGE,
  ADD_SERVER_MESSAGE
} from '../actions/ActionTypes'

const initialState = {
  userMessages: [],
  serverMessages: [],
  user: {
    channels: []
  }
}

export const chatMessageReducer = (state = initialState, action) => {
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
    case ADD_USER_CHANNELS:
      return {
        ...state,
        user: {
          channels: action.channels
        }
      }
    default:
      return state;
  }
}
