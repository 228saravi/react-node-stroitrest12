import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import  SwipeableDrawer   from '@material-ui/core/SwipeableDrawer'
import {  Redirect } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'




import ExitToApp from '@material-ui/icons/ExitToApp'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import MenuIcon from '@material-ui/icons/Menu'
import Fingerprint from '@material-ui/icons/Fingerprint'
import AccountCircle from '@material-ui/icons/AccountCircle'


import {connect} from 'react-redux';
import {Exit as AdminExit, moduleName} from '../../../../redux-stores/dusk/auth';

import classNames from 'classnames'
///

import { NavLink} from 'react-router-dom'
import './Header.scss';

// const drawerWidth = 240;

const styles = {
    root: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    cssRoot: {
        color: '#FFFFFF',
        margin: '20px 0 20px 0',
      },
    item:{
        textDecoration: 'none',
        color: 'black',
    },
    itemWhite:{
        textDecoration: 'none',
        color: '#FFFFFF',
    },

  };

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
        const { classes,authorized, AdminExit } = this.props;
        const drawer = (<List
            component="nav"
            
          >
          <ListItem button>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText inset primary="О предприятии" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText inset primary="Реализованные проекты" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText inset primary="Контакты" />
            </ListItem>
            
            {authorized &&  <div>
                <ListItem button onClick={()=>this.openAdmin(true)}>
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText inset primary="Админка" />
                </ListItem>
                <ListItem button onClick={AdminExit}>
                    <ListItemIcon>
                        <ExitToApp />
                    </ListItemIcon>
                    <ListItemText inset primary="Выход" />
                    </ListItem>
            </div>}
          
          </List>);
        const sideList = (
            <div className="main">
                {drawer}
            </div>
        );
    /*<ListItem button onClick={this.handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText inset primary="Inbox" />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>*/
        return (
            <div className='flexMain'>
                
                {this.state.adminPageOpen && <Redirect to='/admin'/>}
                <Hidden mdUp>
                    <div className={classes.root}>
                        <AppBar position="fixed" color="default">
                            <Toolbar className="toolbar_head">
                                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                                    <MenuIcon />
                                </IconButton>
                                <Button className={classes.cssRoot}><NavLink className = {classes.item} to ='/login'>Login</NavLink></Button>
                            </Toolbar>
                        </AppBar>
                        <SwipeableDrawer
                            open={this.state.left}
                            onClose={this.toggleDrawer(false)}
                            onOpen={this.toggleDrawer(true)}
                            >
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer(false)}
                                onKeyDown={this.toggleDrawer(false)}>
                                {sideList}
                            </div>
                        </SwipeableDrawer>
                        
                    </div>
                    </Hidden>    
                    
                <main className="mainBackground">
                    <Hidden smDown>
                        <Typography variant="title" color="inherit" align="center" >Стройтрест 12</Typography> 
                        <div>
                            <Button className={classes.cssRoot}>О предприятии</Button>
                            <Button className={classes.cssRoot}>Реализованные проекты</Button>
                            <Button className={classes.cssRoot}>Контакты</Button>
                            {authorized?<Button onClick={()=>this.openAdmin(true)} className={classes.cssRoot}>
                                <AccountCircle/>
                            </Button>:
                            <Button className={classes.cssRoot}><NavLink className = {classes.itemWhite} to ='/login'>Login</NavLink></Button>}
                        </div>  
                        
                    </Hidden>
                </main>
                
            </div>
        );
      }
    }
    
export default connect(state=>({authorized: !!state[moduleName].token}),{AdminExit})(withStyles(styles)(index))