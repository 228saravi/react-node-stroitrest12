import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'
import {routerMiddleware} from 'react-router-redux'
import history from './history'
import createSagaMiddleware from 'redux-saga'
import {saga} from './dusk/auth';

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history), logger)

const store = createStore(reducer, {}, enhancer)
sagaMiddleware.run(saga)
//dev only
window.store = store

export default store