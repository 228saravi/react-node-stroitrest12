import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import App from './App'
import Auth from './Auth'
import Admin from './Admin'
import {connect} from 'react-redux';
import {singIn, moduleName} from '../../redux-stores/dusk/auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProtectedRoute from './common/ProtectedRoute'

class Routers extends Component {
    render() {  
        const {loading} = this.props
        return (
            <div>
                <Switch>
                    <Route path= "/login" render={()=>loading ? <CircularProgress  color="secondary" /> : <Auth onSubmit={this.handleSingIn}/>} />
                    <ProtectedRoute path="/admin" component={Admin}/>
                    <Route path= "/" component={App}/>
                </Switch>
            </div>

        );
    }
    handleSingIn=({email,password})=> this.props.singIn(email, password)
}

export default connect(state => ({
    loading: state[moduleName].loading
}),{singIn},null,{pure:false})(Routers);