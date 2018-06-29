import {
  ADD_USER_CHANNELS,
  ADD_USER_MESSAGE,
  ADD_SERVER_MESSAGE,
} from './ActionTypes'

import Api from '../Api.js'

export function addUserMessage(message) {
  return { type: ADD_USER_MESSAGE, message }
}

export function addServerMessage(message) {
  return { type: ADD_SERVER_MESSAGE, message }
}

export function addUserChannels(channels) {
  return { type: ADD_USER_CHANNELS, channels }
}

export const fetchUserChannels = user_id => dispatch =>
  Api.user.channels(user_id)
    .then(
      channels => {
        dispatch(addUserChannels(channels.data))
      }
    )
