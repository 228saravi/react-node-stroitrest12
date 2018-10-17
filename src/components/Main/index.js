import React, { Component } from 'react';
// import Header from './Heder'
// import Body from './Body'
import Loadable from 'react-loadable'
function MyLoadingComponent() {
    return <div>Loading...</div>;
  }
// import Footer from './Footer'
//import '../style/main.scss'
const LoadableComponentHeader = Loadable({
    loader: () => import('./Header/index.js'),
    loading: MyLoadingComponent,
});
const LoadableComponentBody = Loadable({
    loader: () => import('./Body'),
    loading: MyLoadingComponent,
});
class index extends Component {
    render() {
        return (
            <div className="wrapper">
                <LoadableComponentHeader/>
                <LoadableComponentBody/>
            </div>
        );
    }
}

export default index;