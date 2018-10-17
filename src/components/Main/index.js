import React, { Component } from 'react';
import Header from './Header'
import Body from './Body'
class index extends Component {
    render() {
        return (
            <div className="wrapper">
                <Header/>
                <Body/>
            </div>
        );
    }
}

export default index;