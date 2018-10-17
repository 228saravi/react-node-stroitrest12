import React, { Component } from 'react';

import Button from '@material-ui/core/Button'
import {connect} from 'react-redux';
import {loadListJobs} from '../../../redux-stores/dusk/jobs';

class Jobs extends Component {
    render() {
        return (
            <div>
                <Button onClick={()=>{this.props.loadListJobs()}}>Кнопка</Button> 
            </div>
        );
    }
}

export default connect(null,{loadListJobs})(Jobs);