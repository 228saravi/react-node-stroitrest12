import {all, put, call, take} from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

const myApp = 'react-node-stroitrest'
export const moduleName='jobs'

import {Record,OrderedMap} from 'immutable'

import {fbDatatoEntities} from './utils';

const JobRecord=Record({
    _id:null,
    name:null,
    money:null,
    Requirements:null,
    Duties:null,
    Сonditions:null
})

const ReducerRecord = Record({
    entities: new OrderedMap({}),
    loading: false,
    loaded: false,
    error: null
})

export const JOBS_LIST_LOADING_REQUEST = `${myApp}/${moduleName}/JOBS_LIST_LOADING_REQUEST`
export const JOBS_LIST_LOADING_SUCCESS = `${myApp}/${moduleName}/JOBS_LIST_LOADING_SUCCESS`
export const JOBS_LIST_LOADING_ERROR = `${myApp}/${moduleName}/JOBS_LIST_LOADING_ERROR`

export const JOB_CREATE_REQUEST = `${myApp}/${moduleName}/JOB_CREATE_REQUEST`
export const JOB_CREATE_SUCCESS = `${myApp}/${moduleName}/JOB_CREATE_SUCCESS`
export const JOB_CREATE_ERROR = `${myApp}/${moduleName}/JOB_CREATE_ERROR`

export function reduserJobs (state = new ReducerRecord(), action){
    const {type, payload} = action
    switch (type) {
        case JOBS_LIST_LOADING_REQUEST:
            return state
                .set('loading', true)
                .set('loaded', false)
                .set('error', null)
        case JOBS_LIST_LOADING_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('error', null)
                .set('entities', fbDatatoEntities(payload, JobRecord))
        case JOBS_LIST_LOADING_ERROR:
            return state
                .set('loading', false)
                .set('loaded', false)
                .set('error', payload)
            
    
        default:
            return state
    }
}

export function loadListJobs(){
    return{
        type: JOBS_LIST_LOADING_REQUEST
    }
}

function createDataChanleJobsLoad(actoin){
    return eventChannel(emit=>{
        const xhr = new XMLHttpRequest()
        xhr.open('get', '/jobs', true)
        xhr.onload = (e) => {
            emit({
                type: JOBS_LIST_LOADING_SUCCESS,
                payload: JSON.parse(xhr.responseText)
            }) 
            emit(END)
        }
        xhr.onerror = (e) => {
            emit({
                type: JOBS_LIST_LOADING_ERROR,
                payload: e
            })
            emit(END)
        }
        xhr.send()
        return () => {} 
    })
}

export const loadJobsSaga = function * (){
    while(true){
        yield take(JOBS_LIST_LOADING_REQUEST)
        const ajaxDataChanel = yield call(createDataChanleJobsLoad)
        while(true){
            let action = yield take(ajaxDataChanel)
            try {
                if(action.type == JOBS_LIST_LOADING_SUCCESS){
                    yield put({
                        type: JOBS_LIST_LOADING_SUCCESS,
                        payload: action.payload
                })}
                else if(action.type == JOBS_LIST_LOADING_ERROR){
                    yield put({
                        type: JOBS_LIST_LOADING_ERROR,
                        payload: action.payload})
                }

                
            } catch (error) {
                yield put({
                    type: JOBS_LIST_LOADING_ERROR,
                    payload: error
                })
                break;
            }

        }
    }
}

export const saga = function * () {
    yield all([
        loadJobsSaga()
    ])
}







