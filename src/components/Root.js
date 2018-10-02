import React from 'react'
import PropTypes from 'prop-types'
import App from './Routers'
import store from '../../redux-stores'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import history from '../../redux-stores/history'

function Root() {
    return (
        <Provider store = {store}>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </Provider>
    )
}

Root.propTypes = {
}

export default Root