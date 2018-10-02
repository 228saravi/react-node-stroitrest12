import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles}  from '@material-ui/core/styles';

const styles = theme => ({
    textField: {
        width: 238
    }
  });

class componentTextField extends Component {
    render() {
        const { classes } = this.props;
        const { input, label } = this.props;
        return (
            <div>
                <TextField
                className={classes.textField}
                id="standard-uncontrolled"
                label={label}
                margin="normal"
                {...input}
          
                />
            </div>
        );
    }
}

export default withStyles(styles)(componentTextField);