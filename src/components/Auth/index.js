import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import componentPassword from './componentPassword';
const renderInputPassword = ({
    input,
    label

  }) => (
    <FormControl>
    <InputLabel htmlFor="adornment-password">{label}</InputLabel>
    <Input
      id="adornment-password"
      type='text'
      input
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="Toggle password visibility"
           
          >
            <VisibilityOff /> 
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>
)
const renderTextField = ({
    label,
    input
  }) => (
    <TextField
        id="standard-uncontrolled"
        label={label}
        margin="normal"
        {...input}
      
    />
  )
class index extends Component {
    
    render() {
        return (
            <div>
                <h2>Sing in</h2>
                <form>
                    <div>
                        <Field name="email" component={renderTextField} label="Email" />
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