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
import { withRouter } from 'react-router-dom'
import admin from 'firebase-admin';
import { user } from 'firebase-functions/lib/providers/auth';
import Loader from 'react-loader-spinner'
import { render } from 'react-dom';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

//const functions = require('firebase-functions');



const styles = theme => ({
  card: {
    maxWidth: 380,
    margin: 'auto',
    marginTop: '2%'

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
    width: '110%'
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
    width: '50%',
    margin: 'auto',
    fontSize: '110%',
    marginTop: "3%"

  },
  input: {
    display: 'none',
  },
});

class RecipeReviewCard extends Component {


  constructor(props) {
    super(props);



    this.state = {

      firstName: '',
      lastName: '',
      email: '',
      password: '',
      c_password: '',
      companyName: '',
      loaderVisible: false,
      buttonDisable: true,


    }

  }




  handleOnChange = (event) => {

    this.setState({

      [event.target.name]: event.target.value

    });


  };


  goto = (path) => {

    this.props.history.push(path)

  }

  handelSigup = (e) => {

    this.setState({
      loaderVisible: true
    })


    if (this.state.password !== this.state.c_password) {

      alert('password dont match')
      this.setState({
        loaderVisible: false
      })
    }
    else if (this.state.firstName == '' || this.state.lastName == '' || this.state.email == '' || this.state.password == '') {

      alert('field left empty')
      this.setState({
        loaderVisible: false
      })
    }
    else {
      var that = this

      const db = firebase.firestore();

      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(response => {// creating new user in auth

        debugger

        var user = firebase.auth().currentUser;
        let userName = this.state.firstName + ' ' + this.state.lastName
        user.updateProfile({
          displayName: userName,
        }).then(function () {
          // Update successful.
        }).catch(function (error) {
          // An error happened.
          that.setState({
            loaderVisible: false
          })

        })

/////////////////
        user.sendEmailVerification().then(function () {
          // Email sent.
        }).catch(function (error) {
          // An error happened.
        });

        ///////////////////////
        
        let userId = response.user.uid
        if (userId != null) {
          debugger
          //setuserData({userId:response.user.uid})
          // console.log(userId)
          // db.settings({
          //   timestampsInSnapshots: true
          // });
          db.collection("users").doc(userId).set({//adding new user data in database


            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            companyName: this.state.companyName,
            seen: false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            created: new Date().getTime()

          })
            .then(function () {




              firebase.auth().signOut().then(function () {// logging user out wehn signup 
                // Sign-out successful.
                console.log("Document successfully written!");
                alert('you have succesfully signed up!')
                that.goto('/login');

                e.preventDefault();


              }).catch(function (error) {
                // An error happened.
                console.log('user not logged out')
                that.setState({
                  loaderVisible: false
                })
              });

            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
              that.setState({
                loaderVisible: false
              })

              alert(error)
            });

        }



      })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;

          var errorMessage = error.message;
          that.setState({
            loaderVisible: false
          })
          // ...
          alert('error code: ' + errorCode + '  error:' + errorMessage)
        });

    }


  }


  render() {

    const isEnabled = this.state.email.length > 0 && this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.password.length > 0 && this.state.c_password.length > 0;

    const { classes } = this.props

    return (

      <React.Fragment>
        <Header />
        <Card className={classes.card}>
          <CardContent>

            <img src={User} width='80' height='80' />
            <h1>SIGN UP</h1>
            <form className={classes.container} noValidate autoComplete="off" >
              <TextField
                id="outlined-name"
                label="First Name"
                className={classes.textField}
                value={this.state.firstName}
                name='firstName'
                onChange={(event) => this.handleOnChange(event)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="Last Name"
                className={classes.textField}
                value={this.state.lastName}
                name='lastName'
                onChange={(event) => this.handleOnChange(event)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-email-input"
                label="Email"
                className={classes.textField}
                type="email"
                name="email"
                value={this.state.email}
                name='email'
                autoComplete="email"
                onChange={(event) => this.handleOnChange(event)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                className={classes.textField}
                type="password"
                value={this.state.password}
                name='password'
                autoComplete="current-password"
                onChange={(event) => this.handleOnChange(event)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-password-input"
                label="Confirm Password"
                className={classes.textField}
                type="password"
                value={this.state.c_password}
                name='c_password'
                autoComplete="current-password"
                onChange={(event) => this.handleOnChange(event)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="Company Name(optional)"
                className={classes.textField}
                value={this.state.companyName}
                name='companyName'
                onChange={(event) => this.handleOnChange(event)}
                margin="normal"
                variant="outlined"
              />

              <Button color="primary" className={classes.button}
                //type='submit'

                onClick={(event) => this.handelSigup(event)}
                disabled={!isEnabled}

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
    );
  }
}

export default withRouter(withStyles(styles)(RecipeReviewCard)) 