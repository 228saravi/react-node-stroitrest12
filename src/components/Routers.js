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
                    <Route path= "/login" render={()=><Auth onSubmit={this.handleSingIn}/>} />
                    <Route path= "/admin" component={Admin} />
                    <Route path= "/" component={App}/>
                </Switch>
            </div>

        );
    }
    handleSingIn=(value)=>console.log('sing in',value)
}

export default Routers;