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

export const JOB_UPDATE_REQUEST = `${myApp}/${moduleName}/JOB_UPDATE_REQUEST`
export const JOB_UPDATE_SUCCESS = `${myApp}/${moduleName}/JOB_UPDATE_SUCCESS`
export const JOB_UPDATE_ERROR = `${myApp}/${moduleName}/JOB_UPDATE_ERROR`

///reducer start

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
        /////////////update
        case JOB_UPDATE_REQUEST:
            return state
                .set('loading', true)
                .set('loaded', false)
                .set('error', null)
        case JOB_UPDATE_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('error', null)
                .setIn(['entities',payload.job._id],new JobRecord(payload.job));
        case JOB_UPDATE_ERROR:
            return state
                .set('loading', false)
                .set('loaded', false)
                .set('error', payload)
            
    
        default:
            return state
    }
}



///reducer end


export function loadListJobs(){
    return{
        type: JOBS_LIST_LOADING_REQUEST
    }
}
export function updateJobs(value,token){
    return{
        type: JOB_UPDATE_REQUEST,
        payload:value,
        token:token
    }
}

function createDataChanleJobsUpdate(action){
    return eventChannel(emit=>{
        const xhr = new XMLHttpRequest()
        xhr.open('put', '/jobs', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('authorization', action.token)
        xhr.onload = (e) => {
            emit({
                type: JOB_UPDATE_SUCCESS,
                payload: JSON.parse(xhr.responseText)
            }) 
            emit(END)
        }
        xhr.onerror = (e) => {
            emit({
                type: JOB_UPDATE_ERROR,
                payload: e
            })
            emit(END)
        }
        xhr.send(JSON.stringify(action.payload))
        return () => {} 
    })
}

function createDataChanleJobsLoad(action){
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

function * sagaActionCreate(REQUEST, SUCCESS, ERROR, CHANLE){
    while(true){
        console.log('----------',1)
        const action_ =yield take(REQUEST)
        console.log('----------',2)
        const ajaxDataChanel = yield call(CHANLE,action_)
        console.log('----------',3)
        while(true){
            let action = yield take(ajaxDataChanel)
            try {
                if(action.type == SUCCESS){
                    console.log(action.payload)
                    yield put({
                        type: SUCCESS,
                        payload: action.payload
                })}
                else if(action.type == ERROR){
                    yield put({
                        type: ERROR,
                        payload: action.payload})
                }
                break;

                
            } catch (error) {
                yield put({
                    type: ERROR,
                    payload: error
                })
                break;
            }

        }
    }
}

export const saga = function * () {
    yield all([
        sagaActionCreate (
            JOBS_LIST_LOADING_REQUEST,
            JOBS_LIST_LOADING_SUCCESS,
            JOBS_LIST_LOADING_ERROR,
            createDataChanleJobsLoad),
        sagaActionCreate (
            JOB_UPDATE_REQUEST,
            JOB_UPDATE_SUCCESS,
            JOB_UPDATE_ERROR,
            createDataChanleJobsUpdate)
    ])
}







