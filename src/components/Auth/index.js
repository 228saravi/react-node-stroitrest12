import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import componentPassword from './componentPassword';
import componentTextField from './componentTextField'



class index extends Component {
    render() {
        const { classes } = this.props; 
        return (
            <div className = 'formAuth'>
                <h2>Sing in</h2>
                <form>
                    <div >
                        <Field name="email" component={componentTextField} label="Email" />
                    </div>
                    <div>
                        <Field name="password" component={componentPassword} label="Password" />
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                   
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'auth'
})(index);