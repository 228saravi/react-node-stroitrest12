import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { SwipeableDrawer, AppBar, Toolbar, List,
    Typography, IconButton, ListItem, ListItemIcon, ListItemText, Button } from '@material-ui/core';

import { InboxIcon, DraftsIcon, SendIcon, ExpandLess, ExpandMore, MenuIcon } from '@material-ui/icons';

import classNames from 'classnames';
///

import { Link} from 'react-router-dom'
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

      };
    
      toggleDrawer = (open) => () => {
        this.setState({
            left: open,
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
              <ListItemText inset primary="Sent mail" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText inset primary="Drafts" />
            </ListItem>
            <ListItem button onClick={this.handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText inset primary="Inbox" />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          
          </List>);
        const sideList = (
            <div className="main">
                {drawer}
            </div>
        );
    
        return (
            <div className='flexMain'>
                <div className={classes.root}>
                    <AppBar position="fixed" color="default">
                        <Toolbar className="toolbar_head">
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Link to = "/login">Login</Link>
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
    
export default withStyles(styles)(index);