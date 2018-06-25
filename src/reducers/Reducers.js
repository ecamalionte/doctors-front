import { combineReducers } from 'redux'
import { chatMessageReducer } from './chatMessageReducer'
import { apiMessageReducer } from './apiMessageReducer'
import { authReducer } from './authReducer'

export const Reducers = combineReducers({
  auth: authReducer,
  chat: chatMessageReducer,
  APIConnection: apiMessageReducer
})
