import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, yellow } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import callsites from 'callsites';
import Paper from '@material-ui/core/Paper';
import { Backdrop } from '@material-ui/core';

import './LoginForm.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';


import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


import Grid from '@material-ui/core/Grid';
import { maxWidth, fontSize } from '@material-ui/system';
import Steel from './steel.png'
import Lock from './lock.png'
import {withRouter} from 'react-router-dom'
import Header from '../Header/Header'



const useStyles = makeStyles(theme => ({
  card: {
    marginTop:'5%',
    background: 'white',
    width:'25%',
    height:'50%',
    marginLeft:'3%',
    
  
  },

  root: {
    padding: theme.spacing(3),
    height:'100vh',
    backgroundImage: `url(${Steel})`
  },

  media: {
 
    paddingTop: '56.25%', // 16:9
    width:'40%',
    marginLeft:'31%'
  
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },

  backgroundColor: {
    backgroundColor: grey[500],

  },

  button:{
  marginBottom:'3%',

  
  },

  textField:{
    marginBottom:'5%',
    maxWidth:'150%',

    
    },

    logo:{
      //backgroundImage: `url('${LockLogo}')`,
     
      paddingTop:'20%'
  }

}));

 function RecipeReviewCard(props){


 

  //const history = withRouter(props)

  const classes = useStyles();
 
  
  //const [expanded, setExpanded] = React.useState(false);

 
function goto(path){
      props.history.push(path)
//props.history.push(path)

  }

  
  

  return (

   <React.Fragment>
     <Header/>
 <Paper className={classes.root}>

        <Typography >
    
        <Card className={classes.card}>

        <CardContent>
         
        <div><img src={Lock} width='80px' height='80px'/></div>
        

          <div className={classes.textField} >
            <TextField
              id="outlined-email-input"
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
            />

          </div>


          <div className={classes.button}>
            <Button color="primary" className={classes.button}>
              LogIn
            </Button>
            <Button color="secondary" className={classes.button}
            onClick={()=>goto('/signup')}>
              Signup
             </Button>
          </div>

         
          </CardContent>
           </Card>
           </Typography>
           </Paper>
           </React.Fragment>

  );
  
}

export default withRouter(RecipeReviewCard,useStyles);