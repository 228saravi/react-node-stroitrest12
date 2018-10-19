import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import CachedIcon from '@material-ui/icons/Cached'
import AddIcon from '@material-ui/icons/Add'

import {mapToArr} from '../../../redux-stores/duck/utils'
import Loader from '../common/Loader'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {loadListJobs, moduleName} from '../../../redux-stores/duck/jobs'

const styles = theme=>({
    root:{
        width:'100%',
        display:'flex',        
        flexDirection: 'column',
        justifyContent: 'center',
    },
    card: {
        minWidth: 275,
        marginBottom:20
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    noteStyle:{
        textDecoration: 'none',
        color: '#FFFFFF',

    },
    button: {
        margin: theme.spacing.unit,
    },
})

class Jobs extends Component {
    componentDidMount(){
        const {loaded, loading, loadListJobs} = this.props
        if (!loaded && !loading) loadListJobs()
    }
    render() {
        const { jobs, loading, classes } = this.props
        if (loading) return <Loader/>
        const articleElements =jobs.map(jobs =>(
        <Card className={classes.card} key={jobs._id}>
            <CardContent>
                <Typography component="h2">
                    {jobs.name}
                </Typography>
                {jobs.money && <Typography className={classes.pos} color="textSecondary">
                    ОТ {jobs.money} РУБЛЕЙ
                </Typography>}
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" color="primary" className={classes.button}>
                    <Link to = {`/admin/jobs/${jobs._id}`}  className={classes.noteStyle}>
                        ИЗМЕНИТЬ
                    </Link>
                    <CachedIcon className={classes.rightIcon} />
                </Button>
                <Button size="small" variant="contained" color="secondary" className={classes.button}>
                    Delete
                    <DeleteIcon className={classes.rightIcon} />
                </Button>
            </CardActions>
        </Card>
     ))

        return (
            <div className={classes.root}>
                <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
                    <AddIcon />
                </Button>
                {articleElements}
                <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
                    <AddIcon />
                </Button>
            </div>
        )
    
    }
}

export default connect(state=>{
    return{
        loading: state[moduleName].loading,
        loaded: state[moduleName].loaded,
        jobs: mapToArr(state[moduleName].entities)
}},{loadListJobs})(withStyles(styles)(Jobs));