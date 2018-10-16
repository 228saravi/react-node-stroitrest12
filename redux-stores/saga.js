import {saga as authSaga} from './dusk/auth';
import {all} from 'redux-saga/effects';

export default function * (){
    yield all([
        authSaga()
    ])
}