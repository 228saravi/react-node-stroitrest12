import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  loader:{
      width:'100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',   
      alignItems: 'center',
      justifyContent: 'center',
  }
});

function Loader(props) {
  const { classes } = props;
  return (
    <div className={classes.loader}>
      <CircularProgress className={classes.progress} style={{ color: purple[500] }} thickness={7} />
    </div>
  );
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);