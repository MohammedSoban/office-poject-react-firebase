import React, { Component } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red, yellow } from "@material-ui/core/colors";
import { grey } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import callsites from "callsites";
import Paper from "@material-ui/core/Paper";
import { Backdrop } from "@material-ui/core";

import "./LoginForm.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import { maxWidth, fontSize } from "@material-ui/system";
import Steel from "./steel.png";
import Eye from "./eye.png";
import Lock from "./lock.png";
import { withRouter } from "react-router-dom";
import Header from "../Header/Header";
import { EEXIST } from "constants";
import firebase from "../Config/config.js";

import InputAdornment from "@material-ui/core/InputAdornment";

import Loader from "react-loader-spinner";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { user } from "firebase-functions/lib/providers/auth";
import PassReset from "./PassReset";
import { Buttons, Headers, Image, Modal } from "semantic-ui-react";
import Footer from '../Footer/Footer'

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: "5%",
    background: "white",
    maxWidth: 360,
    margin: "auto"
  },

  root: {
    padding: theme.spacing(1),
    height: "100vh",
    backgroundImage: `url(${Steel})`
  },

  media: {
    paddingTop: "56.25%", // 16:9
    width: "40%",
    marginLeft: "31%"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },

  backgroundColor: {
    backgroundColor: grey[500]
  },

  button: {
    //marginBottom:'3%',
    fontSize: "100%",
    margin: "auto"
  },

  textField: {
    marginTop: "3%",
    margin: "auto",

    marginBottom: "5%",
    // maxWidth:'150%',
    width: "100%"
  },

  logo: {
    //backgroundImage: `url('${LockLogo}')`,
    paddingTop: "20%"
  }
}));

function RecipeReviewCard(props) {
  //const history = withRouter(props)

  const classes = useStyles();

  const [userLogin, setuserLogin] = React.useState({
    email: "",
    password: "",
    Credentials: false,
    showPassword: false,
    loaderVisible: false
  });

  const handleClickShowPassword = () => {
    setuserLogin({ ...userLogin, showPassword: !userLogin.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleChange = name => event => {
    setuserLogin({ ...userLogin, [name]: event.target.value });
  };

  function goto(path) {
    props.history.push(path);
  }

  function signIn() {
    setuserLogin({ loaderVisible: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(userLogin.email, userLogin.password)
      .then(Response => {
        var user = firebase.auth().currentUser;

        if (user.emailVerified) {
          console.log("after login " + Response.user.uid);
          console.log(user.emailVerified);

          setuserLogin({
            email: "",
            password: ""
          });

          alert("login successful!");
          setuserLogin({ loaderVisible: false });
          goto("/");
        } else {
          console.log(user.emailVerified);

          setuserLogin({
            email: "",
            password: ""
          });

          // No user is signed in.
          setuserLogin({ loaderVisible: false });
          setuserLogin({ Credentials: false });

          user
            .sendEmailVerification()
            .then(function() {
              // Email sent.
            })
            .catch(function(error) {
              // An error happened.
            });
          alert(
            "Please verify your account, verfication email has been sent to your email"
          );
          firebase
            .auth()
            .signOut()
            .then(function() {
              // logging user out wehn signup
              // Sign-out successful.
              setuserLogin({ loaderVisible: false });
            })
            .catch(function(error) {
              // An error happened.
              console.log("user not logged out");
              setuserLogin({ loaderVisible: false });
            });
        }
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        setuserLogin({
          Credentials: true,
          email: "",
          password: "",
          loaderVisible: false
        });

        alert("error code: " + errorCode + "  error:" + errorMessage);
      });
  }

  //const isEnabled =   userLogin.email.length > 0 && userLogin.password.length > 0;

  return (
    <React.Fragment>
      <Header />
      <Paper className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <div>
              <img src={Lock} width="80px" height="80px" />
            </div>
            {/* email 1 */}

            <div className={classes.textField}>
              <TextField
                id="outlined-email-input"
                label="Email"
                value={userLogin.email}
                className={classes.textField}
                type="email"
                onChange={handleChange("email")}
                autoComplete="email"
                margin="normal"
                variant="outlined"
                error={userLogin.Credentials}
              />

              {/* pass 1 */}
              <TextField
                id="outlined-adornment-password"
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                type={userLogin.showPassword ? "text" : "password"}
                label="Password"
                value={userLogin.password}
                onChange={handleChange("password")}
                error={userLogin.Credentials}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {userLogin.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </div>

            <div className={classes.button}>
              <Button
                color="primary"
                className={classes.button}
                onClick={() => signIn()}
                //  disabled={!isEnabled}
                //onProgress={()=>handleOnProgress()}
              >
                LogIn
              </Button>
              <Button
                color="secondary"
                className={classes.button}
                onClick={() => goto("/signup")}
              >
                Signup
              </Button>

              <Loader
                type="ThreeDots"
                color="green"
                height={100}
                width={100}
                visible={userLogin.loaderVisible}
                //3 secs
              ></Loader>
            </div>

            <PassReset />
          </CardContent>
        </Card>
      </Paper>
      {/* <Footer/> */}
    </React.Fragment>
  );
}

export default withRouter(RecipeReviewCard, useStyles);
