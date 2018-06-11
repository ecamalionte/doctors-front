import { UPDATE_API_MESSAGE } from './ActionTypes'

export function updateAPIMessage(api_connection) {
  return { type: UPDATE_API_MESSAGE, api_connection }
}

export function fetchAPIMessageBegin(message) {
  return { type: UPDATE_API_MESSAGE, api_connection: { message: 'Begin Conecting to API. Please wait...' } }
}

export function fetchAPIMessage() {
  return dispatch => {

    dispatch(fetchAPIMessageBegin())

    return fetch('http://localhost:4000/api')
      .then(response => { return response.json() })
      .then(json => dispatch(updateAPIMessage({ message: json.data, status: 'success' })))
      .catch(error => dispatch(updateAPIMessage({ message: error.message, status: 'error' })) )
  };
}
