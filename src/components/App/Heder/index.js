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


import ExitToApp from '@material-ui/icons/ExitToApp'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import MenuIcon from '@material-ui/icons/Menu'
import Fingerprint from '@material-ui/icons/Fingerprint'


import {connect} from 'react-redux';
import {Exit as AdminExit, moduleName} from '../../../../redux-stores/dusk/auth';

import classNames from 'classnames'
///
import ButtonLoger from './ButtonLogin'

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
              <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText inset primary="Drafts" />
            </ListItem>
            
            {authorized &&  <div>
                <ListItem button onClick={()=>this.openAdmin(true)}>
                    <ListItemIcon>
                        <Fingerprint />
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
                <div className={classes.root}>
                    <AppBar position="fixed" color="default">
                        <Toolbar className="toolbar_head">
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                            <ButtonLoger/>
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
                
                <main className="mainBackground">
                    <Typography variant="title" color="inherit" align="center" >Стройтрест 12</Typography>      
                </main>
            </div>
        );
      }
    }
    
export default connect(state=>({authorized: !!state[moduleName].token}),{AdminExit})(withStyles(styles)(index))