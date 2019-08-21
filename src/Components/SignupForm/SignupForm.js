import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Header from '../Header/Header'
import User from './user.png'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from '../Config/config.js'
import { database } from 'firebase';
import {withRouter} from 'react-router-dom'






const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    margin:'auto',
    marginTop:'2%'
  
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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width:'110%'
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
    width:'50%',
    margin:'auto',
    fontSize:'110%',
    marginTop:"3%"

  },
  input: {
    display: 'none',
  },
}));

function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const [userData, setuserData] = React.useState({
    userId:'',
    firstName: '',
    lastName:'',
    email:'',
    password:'',
    c_password:'',
    companyName:'',
    buttoDisableUntilFieldsEmpty:true
  });

  
  const handleChange = name => event => {
    setuserData({ ...userData, [name]: event.target.value });

  };

 function goto(path){
   props.history.path(path)
 }

  function handelSigup(e){

    

   if(userData.password!==userData.c_password){
     alert('password dont match')
   }
   else if(userData.firstName=='' || userData.lastName=='' || userData.email=='' || userData.password==''){
     alert('field left empty')
   }
   else{
   
    

        firebase.auth().createUserWithEmailAndPassword(userData.email,userData.password) .then(response => {
          setuserData.userId  = response.user.uid;

          const db =firebase.firestore();

      

        const taskRef= db.collection("users").doc(`${setuserData.userId}`).set({
          
          firstName:userData.firstName,
           lastName:userData.lastName,
           email:userData.email,
           password:userData.password,
           companyName:userData.companyName
        });
              
        setuserData({
          userId:'',
          firstName: '',
          lastName:'',
          email:'',
          password:'',
          c_password:'',
          companyName:''
        })

        
      e.preventDefault();

      goto('/login');

        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;

          var errorMessage = error.message;
        
          // ...
        alert('error code: '+ errorCode+  '  error:'+errorMessage)
        });

      }

      
  }
 
  const isEnabled = userData.email.length > 0 && userData.password.length > 0 &&
   userData.firstName.length > 0 && userData.lastName.length > 0  && userData.c_password.length > 0;
  return (

    <React.Fragment>
      <Header/>
    <Card className={classes.card}>
      <CardContent>
        
      <img src={User} width='80' height='80'/>
       <h1>SIGN UP</h1>
      <form className={classes.container} onSubmit={(event)=>handelSigup(event)} 
      noValidate autoComplete="off" >
      <TextField
        id="outlined-name"
        label="First Name"
        className={classes.textField}
        value={userData.firstName}
        onChange={handleChange('firstName')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        label="Last Name"
        className={classes.textField}
        value={userData.lastName}
        onChange={handleChange('lastName')}
        margin="normal"
        variant="outlined"
      />
         <TextField
        id="outlined-email-input"
        label="Email"
        className={classes.textField}
        type="email"
        name="email"
        value={userData.email}
        autoComplete="email"
        onChange={handleChange('email')}
        margin="normal"
        variant="outlined"
      />
         <TextField
        id="outlined-password-input"
        label="Password"
        className={classes.textField}
        type="password"
        value={userData.password}
        autoComplete="current-password"
        onChange={handleChange('password')}
        margin="normal"
        variant="outlined"
      />
         <TextField
        id="outlined-password-input"
        label="Confirm Password"
        className={classes.textField}
        type="password"
        value={userData.c_password}
        autoComplete="current-password"
        onChange={handleChange('c_password')}
        margin="normal"
        variant="outlined"
      />
         <TextField
        id="outlined-name"
        label="Company Name(optional)"
        className={classes.textField}
        value={userData.companyName}
        onChange={handleChange('companyName')}
        margin="normal"
        variant="outlined"
      />

       <Button color="primary" className={classes.button}
       type='submit'
       disabled={!isEnabled}>
       SIGN UP!
      </Button>
    
      </form>
      </CardContent>
    </Card>
    </React.Fragment>
  );
}

export default withRouter(RecipeReviewCard,useStyles)