import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware  } from 'redux'
import { Reducers } from '../reducers/Reducers'

import { composeWithDevTools } from 'redux-devtools-extension'

export const Store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)
