import React, { Component } from 'react';
import {mapToArr} from '../../../redux-stores/duck/utils';
import Loader from '../common/Loader';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'
import {loadListJobs, moduleName} from '../../../redux-stores/duck/jobs';

class Jobs extends Component {
    componentDidMount(){
        const {loaded, loading, loadListJobs} = this.props
        if (!loaded && !loading) loadListJobs()
    }
    render() {
        const {jobs,loading } = this.props
        if (loading) return <Loader/>
        const articleElements = jobs.map(jobs => <li key={jobs._id}>
            <NavLink to = {`/admin/jobs/${jobs._id}`} activeStyle = {{color: 'red'}}>
                {jobs.name}
            </NavLink>
        </li>)

        return (
            <ul>
                {articleElements}
            </ul>
        )
    
    }
}

export default connect(state=>{
    return{
        loading: state[moduleName].loading,
        loaded: state[moduleName].loaded,
        jobs: mapToArr(state[moduleName].entities)
}},{loadListJobs})(Jobs);