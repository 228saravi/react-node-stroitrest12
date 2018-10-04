import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import componentPassword from './componentPassword';
import componentTextField from './componentTextField'
import emailValidator from 'email-validator';


class index extends Component {
    render() {
        const { classes, handleSubmit } = this.props; 
        return (
            <div className = 'formAuth'>
                <h2>Sing in</h2>
                <form onSubmit = {handleSubmit}>
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
const validate = ({email, password})=>{
    const errors={};

    if (!email) errors.email='error is required'
    else if (!emailValidator.validate(email)) errors.email='email invalid'
    if(!password) errors.password='password is required'
    else if (password.length < 8) errors.password='password to short'

    return errors
}

export default reduxForm({
    form: 'auth',
    validate
})(index);