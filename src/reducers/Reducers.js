import { combineReducers } from 'redux';
import { addMessageReducer } from './addMessageReducer';
import { apiMessageReducer } from './apiMessageReducer';

export const Reducers = combineReducers({
  addMessage: addMessageReducer,
  getAPIMessage: apiMessageReducer
})
