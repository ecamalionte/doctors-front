import { UPDATE_API_MESSAGE } from '../actions/ActionTypes'

const initialState = {
  message: 'Conecting to API. Please wait...'
}

export const apiMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_API_MESSAGE:
      return {
        ...state,
        ...action.data
      }
    default:
      return state;
  }
}
