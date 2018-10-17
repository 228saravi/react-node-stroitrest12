import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
// import Main from './Main'
// import Admin from './Admin'
import {connect} from 'react-redux';
import {singIn, moduleName} from '../../redux-stores/dusk/auth';
import ProtectedRoute from './common/ProtectedRoute'
import Loadable from 'react-loadable';
function MyLoadingComponent() {
    return <div className = 'loading'>Loading...</div>;
  }
const LoadableComponentMain = Loadable({
    loader: () => import('./Main'),
    loading: MyLoadingComponent,
});
const LoadableComponentAuth = Loadable({
    loader: () => import('./Auth'),
    loading: MyLoadingComponent,
});
const LoadableComponentAdmin = Loadable({
    loader: () => import('./Admin'),
    loading: MyLoadingComponent,
});
class Routers extends Component {
    render() {  
        const {loading} = this.props
        return (
            <div>
                <Switch>
                    <Route path= "/login" render={()=><LoadableComponentAuth onSubmit={this.handleSingIn}/>} />
                    <ProtectedRoute path="/admin" component={LoadableComponentAdmin}/>
                    <Route path= "/" component={LoadableComponentMain}/>
                </Switch>
            </div>

        );
    }
    handleSingIn=({email,password})=> this.props.singIn({email:email, password:password})
}

export default connect(null,{singIn},null,{pure:false})(Routers);