import React, { Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { withStyles } from '@material-ui/core/styles';
import firebase from '../Config/config.js'

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

const styles = theme => ({
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
});



class SwipeableTextMobileStepper extends Component  {

  constructor(props) {
    super(props);
    
    this.state = {
      activeStep:0,
      clients:[]
    }
  
  
  }

  componentDidMount=()=>{

    const db=firebase.firestore()
    var that=this
    var holdCLients=[]
    db.collection("clients").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        holdCLients.push(doc.data())
      });
      that.setState({
        clients:holdCLients
      })
  });
  
  }


  handleStepChange=client=>{
    
      
    this.setState({
      activeStep:client
    })
    
  }


  render(){

    const { classes } = this.props





  return (
    <div className={classes.root}>
       <AutoPlaySwipeableViews
        axis={styles.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={this.state.activeStep}
        onChangeIndex={()=>this.handleStepChange()}
        enableMouseEvents
      >
          
        {this.state.clients.map((client, index) => (

          <div key={index}>
              
           
              <img className={classes.img} src={client.imageUrl} alt={client.clientName} />    
              <br/>         
              <h4>{client.clientName}</h4>
            
          </div>

        ))}
      </AutoPlaySwipeableViews>
     
    </div>
  );
}
}
export default withStyles(styles)(SwipeableTextMobileStepper);
