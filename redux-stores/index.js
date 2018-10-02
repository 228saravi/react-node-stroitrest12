import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import middlewares from './middlewares'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {routerMiddleware} from 'react-router-redux';
import history from './history';

const enhancer = applyMiddleware(routerMiddleware(history), thunk, logger)

const store = createStore(reducer, {}, enhancer)

//dev only
window.store = store

export default store