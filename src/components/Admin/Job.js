import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import {connect} from 'react-redux';
import {moduleName} from '../../../redux-stores/duck/jobs'
import componentTextField from '../common/componentTextField'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

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
}


class Job extends Component {


  render() {
      const {id, classes} = this.props
    return(
        <div>
            <form onSubmit = {this.handleSubmitJob} className="form">
                <Paper elevation={10} className={classes.conteiner_typography}>                          
                    <Typography className={classes.typography_color} align="center" >Изминение вакансии id:{id}</Typography>                          
                    <div>
                        <Field name="name" component={componentTextField} label="Название" />
                    </div>
                    <div>
                        <Field name="money" component={componentTextField} label="Зарплата" />
                    </div>
                </Paper>
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
        </div>
    )
  }
}

export default reduxForm({
    form: 'JobUpdate'
}) (connect((state,ownProps)=>{
    return{
        job: state[moduleName].entities.get(ownProps.id)
}})(withStyles(styles)(Job)))
