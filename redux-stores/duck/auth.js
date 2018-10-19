import {all, put, call, take} from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

const myApp = 'react-node-stroitrest'
export const moduleName='Auth'

import {Record} from 'immutable'

const ReducerRecord = Record({
    token: null,
    error: null,
    loading: false
})

export const SING_IN_REQUEST = `${myApp}/${moduleName}/SING_IN_REQUEST`
export const SING_IN_SUCCESS = `${myApp}/${moduleName}/SING_IN_SUCCESS`
export const SING_IN_ERROR = `${myApp}/${moduleName}/SING_IN_ERROR`
export const ADMIN_EXIT = `${myApp}/${moduleName}/ADMIN_EXIT`

export default function reducer(state = new ReducerRecord(), action){
    const {type, payload, error} = action
    switch (type) {
        case SING_IN_REQUEST:
            return state.set('loading', true)
        case SING_IN_SUCCESS:
            return state
                .set('loading', false)
                .set('token', payload.token)
        case SING_IN_ERROR:
            return state
                .set('loading', false)
                .set('error', error)   
        case ADMIN_EXIT:
            return state.set('token', null)           
        default:
            return state
    }
}

function CreateDataChanel (action){
    return eventChannel (emit=>{
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/authorization', true)
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
        xhr.onload = (e) => {
            emit({
                type: SING_IN_SUCCESS,
                payload: JSON.parse(xhr.responseText)
            }) 
            emit(END)
        }
        xhr.onerror = (e) => {
            emit({
                type: SING_IN_ERROR,
                payload: e
            })
            emit(END)
        }
        xhr.send(JSON.stringify(action.payload)) 
        return () => {}
    })
}
 
export const addSingInSaga = function * () {
    while (true) {
        const action = yield take(SING_IN_REQUEST)
        const ajaxDataChanel = yield call(CreateDataChanel, action)
        while (true) {
            try {
                
                let action = yield take(ajaxDataChanel)
                if(action.type = SING_IN_SUCCESS){
                    yield put({
                        type: SING_IN_SUCCESS,
                        payload: action.payload
                    })
                    break;
                }
                else if(action.type = SING_IN_ERROR){
                    yield put({
                        type: SING_IN_ERROR,
                        payload: action.error
                    })
                break;
                }
            } catch (error) {
                yield put({
                    type: SING_IN_ERROR,
                    error
                })
                break;
            }
        }
    }
}


export function Exit(){
    return {
            type: ADMIN_EXIT        
    }
}

export function singIn(person){
    return{
        type:SING_IN_REQUEST,
        payload:person
    }
}
export const saga = function * () {
    yield all([
        addSingInSaga()
    ])
} 
