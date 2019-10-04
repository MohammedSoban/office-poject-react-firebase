import React, { Component } from 'react';
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
import admin from 'firebase-admin';
import { user } from 'firebase-functions/lib/providers/auth';
import Loader from 'react-loader-spinner'
import { render } from 'react-dom';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";


const styles = theme => ({
    card: {
      maxWidth: 380,
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
  });
  

class EditProfile extends Component {


    constructor(props) {
        super(props);
    
    
    
        this.state = {
    
          firstName: '',
        lastName:'',
        email:'',
        password:'',
        c_password:'',
        companyName:'',
        loaderVisible:false,
        buttonDisable:true,
        id:''
         
        }
    
    }

    componentDidMount=()=>{
        let id =this.props.match.params.user_id
var that=this
that.setState({
    id:id
})
const db =firebase.firestore();

        var docRef = db.collection("users").doc(id);

docRef.get().then(function(doc) {
    if (doc.exists) {
       
        console.log("Document data:", doc.data());
      var obj=doc.data()

      that.setState({
        firstName: obj.firstName,
        lastName:obj.lastName,
        companyName:obj.companyName,
     
      })
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        alert('no data found')
    }


}).catch(function(error) {
    console.log("Error getting document:", error);
    alert('refresh the page please ',error)
});



    }

    goto=(path)=>{

        this.props.history.push(path)
     
      }

    handleOnChange = (event) => {

        this.setState({
      
          [event.target.name]: event.target.value
      
        });
      
      
      };
    handelSigupEdit=()=>{

        
var that=this

let {firstName,lastName,companyName}=that.state
that.setState({
    loaderVisible:true
})
const db =firebase.firestore();
        var washingtonRef = db.collection("users").doc(that.state.id);

// Set the "capital" field of the city 'DC'
return washingtonRef.update({
    firstName:firstName,
    lastName:lastName,
    companyName:companyName,
})

.then(function() {
    console.log("Document successfully updated!");

    var user = firebase.auth().currentUser;
    let userName=this.state.firstName+' '+this.state.lastName
              user.updateProfile({
                displayName: userName,
              }).then(function() {
                // Update successful.
              }).catch(function(error) {
                // An error happened.
                that.setState({
                  loaderVisible:false
                })
    
              })
              
    that.setState({
        loaderVisible:false
    })
    alert('profile successfully updated')
    that.goto('/');
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    that.setState({
        loaderVisible:false
    })
    alert('Error updating profile')
});
    }

    render() {

        const { classes } = this.props

        return (
            <div>
                <React.Fragment>
      <Header/>
    <Card className={classes.card}>
      <CardContent>
        
      <img src={User} width='80' height='80'/>
       <h1>SIGN UP</h1>
      <form className={classes.container} noValidate autoComplete="off" >
      <TextField
        id="outlined-name"
        label="First Name"
        className={classes.textField}
        value={this.state.firstName}
        name='firstName'
        onChange={(event)=>this.handleOnChange(event)}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        label="Last Name"
        className={classes.textField}
        value={this.state.lastName}
        name='lastName'
        onChange={(event)=>this.handleOnChange(event)}
        margin="normal"
        variant="outlined"
      />

         <TextField
        id="outlined-name"
        label="Company Name(optional)"
        className={classes.textField}
        value={this.state.companyName}
        name='companyName'
        onChange={(event)=>this.handleOnChange(event)}
        margin="normal"
        variant="outlined"
      />

       <Button color="primary" className={classes.button}
      //type='submit'
   
      onClick={()=>this.handelSigupEdit()}
      
      >
       SIGN UP!
      </Button>

      </form>
      
                            <Loader 
                                    type="ThreeDots"
                                    color="green"
                                    height={100}
                                    width={100}
                                    visible={this.state.loaderVisible}
                                    //3 secs 
                                    ></Loader>
      </CardContent>
    </Card>
    </React.Fragment>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(EditProfile)) ;
