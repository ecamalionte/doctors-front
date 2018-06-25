import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { Store } from './store/Store';

import { setAuthToken } from './actions/Auth'

import Auth from './Auth'

import { BrowserRouter, Route } from 'react-router-dom'


if(Auth.hasToken)
  Store.dispatch(setAuthToken(Auth.storagedToken))

ReactDOM.render(
  <BrowserRouter>
    <Provider store={Store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>
  , document.getElementById('root')
);

registerServiceWorker();
