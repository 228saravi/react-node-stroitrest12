import React, { Component } from 'react'
import {withStyles}  from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
    textField: {
        width: 238
    }
  })

class componentTextField extends Component {
    render() {
        const { classes } = this.props;
        const { input, label , meta:{error,touched}} = this.props;
        const errorText = touched && error &&<FormHelperText id="component-error-text">{error}</FormHelperText>
        const boolError = error && touched ? true : false
        console.log(input)
        return (
            <div>
                <FormControl  error={boolError} className={classes.textField}>
                    
                    {label=='id' ? <TextField label={label} className={classes.textField} margin="normal"{...input} variant="filled" disabled
                    />:<TextField label={label} className={classes.textField} margin="normal"{...input} />}
                    {errorText}
                </FormControl>

          
            </div>
        );
    }
}

export default withStyles(styles)(componentTextField);
