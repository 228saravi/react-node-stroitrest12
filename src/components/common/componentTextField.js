import React, { Component } from 'react';
import {withStyles}  from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
    textField: {
        width: 238
    }
  });

class componentTextField extends Component {
    render() {
        const { classes } = this.props;
        const { input, label , meta:{error,touched} } = this.props;
        const errorText = touched && error &&<FormHelperText id="component-error-text">{error}</FormHelperText>
        const boolError = error && touched ? true : false
        return (
            <div>
                <FormControl  error={boolError} className={classes.textField}>
                    <InputLabel htmlFor="component-email">{label}</InputLabel>
                    <Input id="component-email" {...input}/>
                    {errorText}
                </FormControl>

          
            </div>
        );
    }
}

export default withStyles(styles)(componentTextField);
