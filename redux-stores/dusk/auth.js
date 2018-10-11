import ajaxAuth from './ajaxPost';

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
    console.log('---------------',action)
    switch (type) {
        case SING_IN_REQUEST:
            return state.set('loading', true)
        case SING_IN_SUCCESS:
            return state
                .set('loading', false)
                .set('token', payload.token)
        case SING_IN_REQUEST:
            return state
                .set('loading', false)
                .set('error', error)   
        case ADMIN_EXIT:
            return state.set('token', null)           
        default:
            return state
    }
}

export function singIn(email, password){
    return (dispatch)=>{
        dispatch({
            type:SING_IN_REQUEST
        })
        ajaxAuth('POST','/authorization',{email: email, password: password})
            .then((resolve)=>dispatch({
                type: SING_IN_SUCCESS,
                payload: resolve
        }))
            .catch(error=>dispatch({
                type: SING_IN_ERROR,
                error: error
            }))
    }
}
export function Exit(email, password){
    return (dispatch)=>{
        dispatch({
            type: ADMIN_EXIT
        })
    }
}