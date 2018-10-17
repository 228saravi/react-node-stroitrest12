import {saga as authSaga} from './dusk/auth';
import {saga as jobsSaga} from './dusk/jobs';
import {all} from 'redux-saga/effects';

export default function * (){
    yield all([
        authSaga(),
        jobsSaga()
    ])
}