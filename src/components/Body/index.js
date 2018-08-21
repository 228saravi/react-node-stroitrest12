import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
      },
    root: {
      flexGrow: 1,
      maxWidth: 1200,
      padding: theme.spacing.unit * 2,
    },
    gridTop:{
        marginTop: theme.spacing.unit,
    },
    image: {
      width: 500,
      height: 300,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  });

class index extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.gridTop}>
            <Paper className={classes.root}>
                <Grid  container
                direction="row"
                justify="center"
                alignItems="flex-start" spacing={16}>
                <Grid item>
                    <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src={require("../../img/auth.jpg")} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={16}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subheading">
                            Standard license
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" className={classes.button}>
                                Default
                            </Button>
                            <Button variant="outlined" color="primary" className={classes.button}>
                                Primary
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </Paper>
            </Grid>



            
          );
    }
}

export default withStyles(styles)(index);