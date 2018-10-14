import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider} from 'react-redux';

import { gameReducer } from './reducers/gameReducer';
import thunkMiddleware from 'redux-thunk'

import './index.css';
import App from './App';
import { getApiUrl } from './actions/actions';
import { saveStore } from './globalStore';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(gameReducer, composeEnhancers(    
  applyMiddleware(thunkMiddleware)
));

store.dispatch(getApiUrl());

saveStore(store);

ReactDOM.render(
<Provider store={store}><App /></Provider>, document.getElementById('root'));
