import { UPDATE_API_MESSAGE } from './ActionTypes'
import Api from '../Api.js'

export function updateAPIMessage(data) {
  return { type: UPDATE_API_MESSAGE, data }
}

export function fetchAPIMessageBegin(message) {
  return { type: UPDATE_API_MESSAGE, data: { message: 'Begin Conecting to API. Please wait...' } }
}

export function fetchAPIMessage() {
  return dispatch => {

    dispatch(fetchAPIMessageBegin())

    return Api.connection()
      .then(
        res => dispatch(
          updateAPIMessage({ message: res.data.message, status: 'success' })
        )
      )
      .catch(
        error => dispatch(
          updateAPIMessage({ message: error.message, status: 'error' })
        )
      )
  };
}
