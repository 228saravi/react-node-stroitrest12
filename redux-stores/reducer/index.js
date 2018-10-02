import {combineReducers} from 'redux'
import filters from './filters'
import {routerReducer as router} from 'react-router-redux';
import {reducer as form} from 'redux-form'


export default combineReducers({router, form , filters})