import { combineReducers } from 'redux';
import { chatMessageReducer } from './chatMessageReducer';
import { apiMessageReducer } from './apiMessageReducer';

export const Reducers = combineReducers({
  chatReducer: chatMessageReducer,
  getAPIMessage: apiMessageReducer
})
