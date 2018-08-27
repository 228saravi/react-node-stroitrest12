import React, { Component } from 'react';
import { NavLink} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import './ButtonLog.scss'
class ButtonLogin extends Component {
    render() {
        //const {autorize} = this.props
         const autorize = false
        return (
            <Button><NavLink className = 'item' to = {autorize ? '/admin' : '/login'}>Login</NavLink></Button>

        );
    }
}

export default ButtonLogin;