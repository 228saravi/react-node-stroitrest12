import React from 'react'
import PropTypes from 'prop-types'
import App from './Routers'
import store from '../../redux-stores'
import {Provider} from 'react-redux'

function Root() {
    return (
        <Provider store = {store}>
            <App/>
        </Provider>
    )
}

Root.propTypes = {
}

export default Root