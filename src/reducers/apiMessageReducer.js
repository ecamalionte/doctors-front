import { UPDATE_API_MESSAGE } from '../actions/ActionTypes'

const initialState = {
  api_connection: { message: 'Conecting to API. Please wait...' }
}

export const apiMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_API_MESSAGE:
      return {
        ...state,
        api_connection: action.api_connection
      }
    default:
      return state;
  }
}
