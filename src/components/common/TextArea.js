import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root:{
        marginBottom: '10px'
    },
    textarea:{
        width:'100%'
    }
  })

function TextArea(props) {
    const { input, label , meta:{error,touched},classes} = props;
    return (
        <div className={classes.root}>
            <Typography color="textSecondary">{label}</Typography>
            <textarea rows="10" className={classes.textarea} name="text" {...input} ></textarea>
        </div>
    );
}


export default withStyles(styles)(TextArea)