import {combineReducers} from 'redux'
import filters from './filters'
import {routerReducer as router} from 'react-router-redux';
import {reducer as form} from 'redux-form'
import authReduser, {moduleName as authModule} from '../dusk/auth';

export default combineReducers({
    router, form , filters,
    [authModule]: authReduser
})