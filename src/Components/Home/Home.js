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
import Headers from '../Header/Header';
import firebase from '../Config/config.js'
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer'
import { Grid, Image } from 'semantic-ui-react'
import { Container, Header } from 'semantic-ui-react'
import ProductPictures from '../Clients/ProductPictures'
import { Card, Icon} from 'semantic-ui-react'
import { withStyles } from '@material-ui/core/styles';

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




const styles = theme => ({
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
});




class SwipeableTextMobileStepper extends Component {
 // const classes = useStyles();
 // const theme = useTheme();
 constructor(props) {
  super(props);
  
  this.state = {
    activeStep:0,
    //emailSent:false ,
    open:false  
  }


}
 // const [activeStep, setActiveStep] = React.useState(0);




     handleStepChange=step=>{
    
      
    this.setState({
      activeStep:step
    })
    
  }

 
  render() {

    const { classes } = this.props
    const maxSteps = tutorialSteps.length;

  return (
     
   <React.Fragment>

         <Headers/>
        
    
   
    <div className={classes.root}>
        
    
       
      <AutoPlaySwipeableViews
        axis={styles.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={this.state.activeStep}
        onChangeIndex={()=>this.handleStepChange()}
        enableMouseEvents
      >
          
        {tutorialSteps.map((step, index) => (
            
          <div key={step.label}>
              
            {Math.abs(0 - index) <= 4 ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />             
            ) : null}
            
          </div>

        ))}
      </AutoPlaySwipeableViews>
      
    </div>

    <Grid celled='internally' stackable={true} >
    <Grid.Row  >
      <Grid.Column width={3}>
        <h1>Clients</h1>
      
        <ProductPictures/>
      </Grid.Column>
      <Grid.Column width={10} textAlign='left' >
      <Container text textAlign='left'>
    <Header as='h1'>Company Overview</Header>
    <p>
    Moon Steel Fabricators are pioneers in steel fabrication in Pakistan. We are the leading manufacturers of customized stainless steel equipment, particularly for commercial kitchens, laboratories, hotels and restaurants, etc.
</p>
<p>
The portfolio for MSF includes major names such as Serena Hotel Islamabad, Shaikh Zayed Palaces across Pakistan as well as kitchen equipment for every Pizza Hut branch in Pakistan.
</p>
<p>
The ethos of the company lay utmost emphasize on quality, durability by using the latest technological tools at its disposal, to ensure that the client always gets their money’s worth.
    </p>

<br/>
    <Header as='h1'>History</Header>
    <p>Established back in 1947, the Moon Steel Fabricators (MSF) produced its first steel project in 1974. During the last 36 years, the 
      MSF has on its credit the production for the leading organizations in the country.</p>

      <br/>
      <Header as='h1'>Services</Header>
      <li>
        Plannig
      </li>
      <li>
      Designing and Drawing
      </li>
<li>
Designing and Drawing
</li>
<li>
Fabrication
</li>
    </Container>


      </Grid.Column>
      <Grid.Column width={3}>
      <Card centered={true}>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
      </Grid.Column>
    </Grid.Row>
    </Grid>
   
   


    <Footer/>
  
    </React.Fragment>
  );
            }
}

export default withStyles(styles)(SwipeableTextMobileStepper);
