import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware  } from 'redux'
import { Reducers } from '../reducers/Reducers'

export const Store = createStore(
  Reducers,
  applyMiddleware(
    thunkMiddleware,
  )
)
