import {combineReducers} from 'redux'
import filters from './filters'
import {routerReducer as router} from 'react-router-redux';
import {reducer as form} from 'redux-form'
import authReduser, {moduleName as authModule} from '../dusk/auth';
import {reduserJobs, moduleName as jobModule} from '../dusk/jobs';

export default combineReducers({
    router, form , filters,
    [authModule]: authReduser,
    [jobModule]: reduserJobs
})