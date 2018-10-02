import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import App from './App'
import Auth from './Auth'
import Admin from './Admin'
class Routers extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path= "/login" component={Auth}/>
                    <Route path= "/admin" component={Admin}/>
                    <Route path= "/" component={App}/>
                </Switch>
            </div>
        );
    }
}

export default Routers;