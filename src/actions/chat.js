import { ADD_USER_MESSAGE, ADD_SERVER_MESSAGE } from './ActionTypes'

export function addUserMessage(message) {
  return { type: ADD_USER_MESSAGE, message }
}

export function addServerMessage(message) {
  return { type: ADD_SERVER_MESSAGE, message }
}
