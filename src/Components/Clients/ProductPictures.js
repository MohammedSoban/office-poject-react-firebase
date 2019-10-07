import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import Costa from './costa.gif'
import dd from './dd.gif'
//import dd from './dd.png'
import abl from './abl.gif'
import AKUH from './AKUH.gif'
import avari from './avari.gif'
import bhp from './bhp.gif'
import kfc from './KFC.gif'
import marriot from './marriot.gif'
import mcdonals from './mcdonals.jpg'
import Nandos from './Nandos.gif'
import novartis from './novartis.gif'
import pc from './pc.gif'
import pfizer from './pfizer.gif'
import PIZZAHUT from './PIZZAHUT.jpg'
import sb from './sb.gif'
import searle from './searle.gif'
import Serena from './Serena.gif'
import shereton from './shereton.gif'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:abl,
 
  },
  {
    label: 'Bird',
    imgPath:
      dd,
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      Costa,
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      AKUH,
  },
  {
    label: 'Goč, Serbia',
    imgPath:avari,
  },
  {
    label: 'Goč, Serbia',
    imgPath:bhp,
  },
  {
    label: 'Goč, Serbia',
    imgPath:kfc,
  },
  {
    label: 'Goč, Serbia',
    imgPath:marriot,
  },
  {
    label: 'Goč, Serbia',
    imgPath:mcdonals,
  },
  {
    label: 'Goč, Serbia',
    imgPath:Nandos,
  },
  {
    label: 'Goč, Serbia',
    imgPath:pc,
  },
  {
    label: 'Goč, Serbia',
    imgPath:pfizer,
  },
  {
    label: 'Goč, Serbia',
    imgPath:PIZZAHUT,
  },
  {
    label: 'Goč, Serbia',
    imgPath:sb,
  },
  {
    label: 'Goč, Serbia',
    imgPath:searle,
  },
  {
    label: 'Goč, Serbia',
    imgPath:Serena,
  },
  {
    label: 'Goč, Serbia',
    imgPath:shereton,
  },

];

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 300,
    flexGrow: 1,
    margin:'auto'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 120,
    display: 'center',
    margin:'auto',

    maxWidth: 120,
    overflow: 'hidden',
    width: '100%',
  },
}));

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
       {/* <Paper square elevation={0} className={classes.header}>
       <Typography>{tutorialSteps[activeStep].label}</Typography> 
      </Paper>  */}
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt/>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
     
    </div>
  );
}

export default SwipeableTextMobileStepper;
