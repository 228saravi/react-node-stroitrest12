import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Admin from './Admin'
import {connect} from 'react-redux';
import {singIn, moduleName} from '../../redux-stores/duck/auth';
import ProtectedRoute from './common/ProtectedRoute'
import Loadable from 'react-loadable';
import Loader from './common/Loader';
const LoadableComponentMain = Loadable({
    loader: () => import('./Main'),
    loading: Loader,
});
const LoadableComponentAuth = Loadable({
    loader: () => import('./Auth'),
    loading: Loader,
});
// const LoadableComponentAdmin = Loadable({
//     loader: () => import('./Admin'),
//     loading: Loader,
// });
class Routers extends Component {
    render() {  
        const {loading} = this.props
        return (
            <div>
                <Switch>
                    <Route path= "/login" render={()=><LoadableComponentAuth onSubmit={this.handleSingIn}/>} />
                    <ProtectedRoute path="/admin" component={Admin}/>
                    <Route path= "/" component={LoadableComponentMain}/>
                </Switch>
            </div>

        );
    }
    handleSingIn=({email,password})=> this.props.singIn({email:email, password:password})
}

export default connect(null ,{singIn},null,{pure:false})(Routers);