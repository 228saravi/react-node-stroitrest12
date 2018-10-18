import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import {connect} from 'react-redux';
import {moduleName} from '../../../redux-stores/duck/jobs'
import componentTextField from '../common/componentTextField'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress'
import green from '@material-ui/core/colors/green';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

const styles =theme=>({
    conteiner_typography :{        
        backgroundColor: 'purple',
        
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
    },
    typography_color:{
        color: '#FFFFFF',
        fontSize: '16px'
    },
    form:{
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center'

    },
    root:{
        display: 'flex',
        flexDirection: 'column',      
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
        display: 'flex',
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: 4,
        left: 4,
        zIndex: 1,
    },
})


class Job extends Component {
    state = {
        loading: false,
        success: false,
      };
    
      componentWillUnmount() {
        clearTimeout(this.timer);
      }
      componentWillMount() {
        this.props.initialize({id:this.props.id});
      }
    
      handleButtonClick = () => {
        if (!this.state.loading) {
          this.setState(
            {
              success: false,
              loading: true,
            },
            () => {
              this.timer = setTimeout(() => {
                this.setState({
                  loading: false,
                  success: true,
                });
              }, 2000);
            },
          );
        }
      };
    render() {
        const {id, classes, handleSubmit} = this.props        
        const { loading, success } = this.state;
        
        const buttonClassname = classNames({
            [classes.buttonSuccess]: success,
          })
        return(
            <div>
                <form onSubmit = {handleSubmit} className="form" >
                    <Paper className={classes.root} elevation={4}>
                        <Paper elevation={10} className={classes.conteiner_typography}>                          
                            <Typography className={classes.typography_color} align="center" >Изминение вакансии </Typography> 
                            <Typography className={classes.typography_color} align="center" >id:{id}</Typography> 

                            
                        </Paper>    
                            <div>
                                <Field name="id" component={componentTextField} label="id" />
                            </div>                 
                            <div>
                                <Field name="name" component={componentTextField} label="Название"/>
                            </div>
                            <div>
                                <Field name="money" component={componentTextField} label="Зарплата" />
                            </div>

                        <input type="submit"
                            className="inputSubmit"
                            id="outlined-button-file"
                            />

                        <div className={classes.wrapper}>
                            <label htmlFor="outlined-button-file" className='labelButton'>
                                    <Button
                                    variant="fab"
                                    color="primary"
                                    component="span"
                                    className={buttonClassname}
                                    onClick={this.handleButtonClick}
                                >
                                    {success ? <CheckIcon /> : <SaveIcon />}
                                </Button>
                            </label>  
                            
                            {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                        </div>


                    </Paper>                  

                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'JobUpdate',
    
}) (connect((state,ownProps)=>{
    return{
        loading: state[moduleName].loading,
        loaded: state[moduleName].loaded,
        error: state[moduleName].error,
        job: state[moduleName].entities.get(ownProps.id)
}})(withStyles(styles)(Job)))
