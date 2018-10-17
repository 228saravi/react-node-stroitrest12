import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import {NavLink, Route,Switch } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Jobs from './Jobs'
import Job from './Job'

import SendIcon from '@material-ui/icons/Send'
const drawerWidth = 240;
const styles = theme => ({
    root: {
      flexGrow: 1,
      height: 440,
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
      position: 'relative',
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
      minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
    item:{
        textDecoration: 'none',
        color: 'black',
    },
  })

  

class index extends Component {
    state = {
        left: false,
        adminPageOpen:false
    };
    toggleDrawer = (open) => () => {
        this.setState({
            left: open,
        });
    };
    openAdmin =  (open) => {
        this.setState({
            adminPageOpen: open,
        });
    };
    render() {
        const { classes } = this.props;
        const drawer = (<List
            component="nav"
            
          >
          <ListItem button>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <NavLink to='/admin/jobs' className = {classes.item}>Вакансия</NavLink>
            </ListItem>
            
          
          </List>);
        
        return (
            <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <Typography color="inherit" noWrap>
                            Clipped drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <List>{drawer}</List>
                    <Divider />
                    <List>{drawer}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path="/admin/jobs/:id" render = {this.getJob}/>
                        <Route path="/admin/jobs" component={Jobs}/>
                    </Switch>
                </main>
            </div>
        );
    }
    getJob = ({ match }) => {
        const { id } = match.params
        return <Job id = {id} isOpen key = {id} />
    }
}

export default withStyles(styles)(index)