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
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { Timestamp } from '@google-cloud/firestore';
import one from './slideshow/1.jpg'
import two from './slideshow/2.jpg'
import three from './slideshow/3.jpg'
import four from './slideshow/4.jpg'
import five from './slideshow/5.jpg'
import six from './slideshow/6.jpg'
import seven from './slideshow/7.jpg'
import eight from './slideshow/8.jpg'
import nine from './slideshow/9.jpg'
import ten from './slideshow/10.jpg'
import { Carousel } from 'react-responsive-carousel';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact";
// import Carousel from 'nuka-carousel';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);




const tutorialSteps = [

  {
    label: 'Goč, Serbia',
    imgPath:nine
  },
  {
    label: 'Goč, Serbia',
    imgPath:ten
  },
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:one,
  },
 


];




const styles = theme => ({
  root: {
    maxWidth:"100%",
     flexGrow: 1,
     margin:'auto',
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
     height: '100%',
     display: 'block',
     //maxWidth: 'auto',
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
    open:false,
    notices:[]
  }


}
 // const [activeStep, setActiveStep] = React.useState(0);


componentDidMount=()=>{

  const db=firebase.firestore()
  var that=this

  var noticeHolder=[]
  db.collection("notice").doc("notice")
  .onSnapshot(function(doc) {
   
      noticeHolder.push(doc.data())
 
   
      that.setState({
        notices:noticeHolder
    })
  
  
  });

 

}

     handleStepChange=step=>{
    
      
    this.setState({
      activeStep:step
    })
    
  }

 
  render() {
    const handleOnDragStart = e => e.preventDefault()
    const { classes } = this.props
    const maxSteps = tutorialSteps.length;

  return (
     
   <React.Fragment>


         <Headers/>
        
    <div className='fade-in-top'>
   
    <div  style={{height:"80%",width:"100%" ,overflow:"hidden"}}>
        
    
       
      <AutoPlaySwipeableViews
        axis={styles.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={this.state.activeStep}
        onChangeIndex={()=>this.handleStepChange()}
        enableMouseEvents
      >
          
        {tutorialSteps.map((step, index) => (
            
        
              
           
              <img  src={step.imgPath} height="100%" width="100%"/>             
        
            
      

        ))}
      </AutoPlaySwipeableViews>
      
    </div>
{/* 
    <Carousel
                    dynamicHeight={false}
                    showThumbs={false}
                      dynamicHeight={true}
                    useKeyboardArrows={true}
                    autoPlay={true}
                    swipeable={true}
                    interval={2000}
                    infiniteLoop={true}
                    >
                    
                      {tutorialSteps.map((step,index)=>{
                        return(
                        <div style={{display:"inline-block", overflow:"hidden" ,width:"100%",height:"",}}>
                        <img src={step.imgPath}   height="100%" width="100%" />
                        </div>
                        )
                      })
                    }
               
            </Carousel> */}


{/* <div style={{margin:"auto",height:700 ,overflow:"hidden"}}>
      <Carousel width="100%" >
      {tutorialSteps.map((step, index) => (
            
           
     
             
                <img  src={step.imgPath} height="100%" width="100%"/>             
          
         
        
  
          ))}

      </Carousel>
      </div> */}


  
    <Grid celled='internally' stackable={true} >
    <Grid.Row>
      <Grid.Column width={3}>
      <h3>Notice Board</h3>
        {this.state.notices.slice(0,1).map((notice)=>{
          return(
      <Card centered={true}>
    <Card.Content>
      <Card.Header>{notice.noticeTitle}</Card.Header>
    
<br/>
      <Card.Description>
      {notice.noticeDescription}
      </Card.Description>
     
    </Card.Content>
  </Card>
          )
  })
}
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
        Planning
      </li>
      <li>
      Designing and Drawing
      </li>
<li>
Customization
</li>
<li>
Fabrication
</li>
    </Container>


      </Grid.Column>
      <Grid.Column width={3}>





 
    

 


 
  <h1>Clients</h1>
      
      <ProductPictures/>
  




      {/* <Card centered={true}>
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
  </Card> */}
      </Grid.Column>
    </Grid.Row>
    </Grid>
   
   

    </div>
    <Footer/>
 
    </React.Fragment>
  );
            }
}

export default withStyles(styles)(SwipeableTextMobileStepper);
