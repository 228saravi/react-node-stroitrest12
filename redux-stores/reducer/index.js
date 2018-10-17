import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux';
import {reducer as form} from 'redux-form'
import authReduser, {moduleName as authModule} from '../duck/auth';
import {reduserJobs, moduleName as jobModule} from '../duck/jobs';

export default combineReducers({
    router, form ,
    [authModule]: authReduser,
    [jobModule]: reduserJobs
})