import React, { Component } from 'react';
import Header from './Heder'
import Body from './Body'
import Footer from './Footer'
//import '../style/main.scss'
class index extends Component {
    render() {
        return (
            <div className="wrapper">
                <Header/>
                <Body/>
                <Footer/>
            </div>
        );
    }
}

export default index;