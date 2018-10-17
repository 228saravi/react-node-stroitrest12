import {saga as authSaga} from './duck/auth';
import {saga as jobsSaga} from './duck/jobs';
import {all} from 'redux-saga/effects';

export default function * (){
    yield all([
        authSaga(),
        jobsSaga()
    ])
}