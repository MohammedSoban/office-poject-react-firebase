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
import Header from '../Header/Header';

import Navigation from '../Navigation/Navigation';



const AutoPlaySwipeableViews = autoPlay(SwipeableViews);




const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:`http://banella.co.za/wp-content/uploads/2013/11/jpeg-8.jpg`,
  },
  {
    label: 'Bird',
    imgPath:
      'https://saadegroup.mn/wp-content/uploads/2018/03/f1.jpg',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'http://moonsteelfab.com/products/counters/images/IMG_1465.JPG',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      'https://scontent.fkhi6-1.fna.fbcdn.net/v/t1.0-9/18739683_834348016721843_7141563245342961610_n.jpg?_nc_cat=102&_nc_eui2=AeHqg9RGfQ3YS8eeuTJp46mLBJ3S0WekFDtlCK_USW8vqZ7lDR6Q-cXCJkK0-40ZR7ske_uCtrBWbuIfd-FpUlusjX3B11MOMWivc6cYLpuJYg&_nc_oc=AQmIzfAisci3lfmCvjABui_WFE0ImiMmf8BQM6o51rOMPkYBarluosHLTh2LsQUHfg4&_nc_ht=scontent.fkhi6-1.fna&oh=42624a0c7c9931bf5a5cafc49d4fca02&oe=5DE61A4F',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'http://moonsteelfab.com/products/counters/images/IMG_1460.JPG',
  },
];

const useStyles = makeStyles(theme => ({
  root: {
   maxWidth:"100%",
    flexGrow: 1,
    //marginLeft:'18%',
   // marginTop:'2%',
   
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 470,
    display: 'block',
    maxWidth: 'auto',
    overflow: 'hidden',
    width: '100%',
  },
  
}));

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleStepChange(step) {
    setActiveStep(step);
  }

  return (
      <React.Fragment>
         <Header/>
        {/* <Navigation/> */}
   
    <div className={classes.root}>
        
    
       
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
          
        {tutorialSteps.map((step, index) => (
            
          <div key={step.label}>
              
            {Math.abs(activeStep - index) <= 4 ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />             
            ) : null}
            
          </div>

        ))}
      </AutoPlaySwipeableViews>
      
    </div>
    </React.Fragment>
  );
}

export default SwipeableTextMobileStepper;
