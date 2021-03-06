import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { URL } from 'url';
import { url } from 'inspector';

const tutorialSteps = [
    {
      label: 'How to be happy :)',
      imgPath: '../../img/auth.jpg',
    },
    {
      label: '1. Work with something that you like, like…',
      imgPath: '../../img/auth2.jpg',
    },
    {
      label: '2. Keep your friends close to you and hangout with them',
      imgPath: '../../img/trest.jpg',
    },
    {
      label: '3. Travel everytime that you have a chance',
      imgPath: '../../img/Header.jpg',
    },
  ];

const styles = theme => ({
    root: {
      maxWidth: '100%',
      flexGrow: 1,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      paddingLeft: theme.spacing.unit * 4,
      marginBottom: 20,
    },
    img: {
      height: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
      width: '100%',
    },
  });

class Stepers extends Component {
    state = {
        activeStep: 0,
      };
    
    handleNext = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };
    
    handleBack = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };
    
    render() {
        const { classes, theme } = this.props;
        const { activeStep } = this.state;
    
        const maxSteps = tutorialSteps.length;
    
        return (
            <div className={classes.root}>
                <Paper square elevation={0} className={classes.header}>
                    <Typography>{tutorialSteps[activeStep].label}</Typography>
                </Paper>
                <img
                    className={classes.img}
                    src={tutorialSteps[activeStep].imgPath}
                    alt={tutorialSteps[activeStep].label}
                />
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    className={classes.mobileStepper}
                    nextButton={
                        <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                            Next
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                        </Button>
                    }
                />
            </div>
        );
    }
}

    
export default withStyles(styles, { withTheme: true })(Stepers);