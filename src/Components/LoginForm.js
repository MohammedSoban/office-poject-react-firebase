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
import Steel from '../Components/Backgroundimg/steel.png';
import './LoginForm.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import LockLogo from '../Components/locker.png';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import Lock from '../Components/Lock.png'
import Grid from '@material-ui/core/Grid';
import { maxWidth } from '@material-ui/system';




const useStyles = makeStyles(theme => ({
  card: {
 
  marginLeft:'20%',
  marginRight:'20%',
    background: 'white'
   

  },

  // root: {
  //   flexGrow: 1,
  //   backgroundImage: `url(${Steel})`,
  //   height:'100%'
    
  // },


  root: {
    padding: theme.spacing(3),
    //height:'100vh',
   //backgroundImage: `url(${Steel})`
  },

  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    //backgroundImage: `url(${Steel})`,
  },


  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
    maxWidth:'%'
    
    },

    logo:{
      backgroundImage: `url('${LockLogo}')`,
     
      paddingTop:'20%'
  }

}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (

  //   <div className={classes.root}>
  //   <Grid container spacing={3}>
  //     <Grid item xs={12}>
  //       <Paper className={classes.paper}>xs=12</Paper>
  //     </Grid>
  //     <Grid item xs={12} sm={6}>
  //       <Paper className={classes.paper}>xs=12 sm=6</Paper>
  //     </Grid>
  //     <Grid item xs={12} sm={6}>
  //       <Paper className={classes.paper}>xs=12 sm=6</Paper>
  //     </Grid>
  //     <Grid item xs={6} sm={3}>
  //       <Paper className={classes.paper}>xs=6 sm=3</Paper>
  //     </Grid>
  //     <Grid item xs={6} sm={3}>
  //       <Paper className={classes.paper}>xs=6 sm=3</Paper>
  //     </Grid>
  //     <Grid item xs={6} sm={3}>
  //       <Paper className={classes.paper}>xs=6 sm=3</Paper>
  //     </Grid>
  //     <Grid item xs={6} sm={3}>
  //       <Paper className={classes.paper}>xs=6 sm=3</Paper>
  //     </Grid>
  //   </Grid>
  // </div>

    <div className='fade-in'>

    
        <Card className={classes.card}>

           {/* <div className={classes.logo}></div>  */}
         <h1 >SIGN IN</h1>

          <div className={classes.textField}>
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
            <Button color="secondary" className={classes.button}>
              Signup
             </Button>
        </div>

       
           </Card>

    </div>




  );
}
