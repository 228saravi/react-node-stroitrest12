import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import './Auth.scss';
import { withStyles } from '@material-ui/core/styles'
import componentPassword from './componentPassword'
import componentTextField from './componentTextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import emailValidator from 'email-validator'

import {  Redirect } from 'react-router-dom'

import {connect} from 'react-redux'
import { moduleName} from '../../../redux-stores/dusk/auth'
import MySnackbarContentWrapper from '../common/MySnackbarContent'

const styles = {
    conteiner_typography :{
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translateY(-50%)',
        backgroundColor: 'purple',
    },
    typography_color:{
        color: '#FFFFFF',
        fontSize: '16px'
    }
};



class index extends Component {
    state = {
        openMessage: true,
    }
    handleClick = () => {
        this.setState({ openMessage: true })
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ openMessage: false });
    }
    render() {
        const { classes, handleSubmit, authorized, error, loading } = this.props; 
        return (
            <div className = 'formAuth'>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={loading}
                    autoHideDuration={60}
                    >
                    <MySnackbarContentWrapper
                        onClose={this.handleClose}
                        variant="warning"
                        message="Загрузка пользователя!!"
                    />
                </Snackbar>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={!!error}
                    autoHideDuration={60}
                    >
                    <MySnackbarContentWrapper
                        onClose={this.handleClose}
                        variant="error"
                        message="This is a success message!"
                    />
                </Snackbar>
                {authorized && <Redirect to='/'/>}
                <Paper elevation={10} className='conteiner_form'>
                    <form onSubmit = {handleSubmit} className="form">
                        <Paper elevation={10} className={classes.conteiner_typography}>
                          
                                <Typography className={classes.typography_color} align="center" >Sing in</Typography>
                            
                        </Paper>
                        <div >
                            <Field name="email" component={componentTextField} label="Email" />
                        </div>
                        <div>
                            <Field name="password" component={componentPassword} label="Password" />
                        </div>
                            <input type="submit"
                                className="inputSubmit"
                                id="outlined-button-file"
                                />
                            <label htmlFor="outlined-button-file" className='labelButton'>
                                <Button color="secondary" component="span" htmlFor="outlined-button-file">
                                    GET STARTED
                                </Button>
                            </label>                    
                    </form>
                </Paper>
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
})(connect(state=>({authorized:!!state[moduleName].token,
    loading: state[moduleName].loading,
    error: state[moduleName].error}))(withStyles(styles)(index)));