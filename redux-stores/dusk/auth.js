const myApp = require('config').my_app
export const moduleName='Auth'

export const SING_IN_REQUEST = `${myApp}/${moduleName}/SING_IN_REQUEST`
export const SING_IN_SUCCESS = `${myApp}/${moduleName}/SING_IN_SUCCESS`
export const SING_IN_ERROR = `${myApp}/${moduleName}/SING_IN_ERROR`

export default function reducer(state, action){
    const {type} = action

    switch (type) {
        // case value:
            
        //     break;
    
        default:
            return state
    }
}

export function singIn(email, password){
    return (dispatch)=>{
        dispatch({
            type:SING_IN_REQUEST
        })
    }
}