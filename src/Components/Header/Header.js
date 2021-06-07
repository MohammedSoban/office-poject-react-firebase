import React, { Component } from "react";
import { Input, Menu } from "semantic-ui-react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles, getContrastRatio } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { Icon } from "semantic-ui-react";
import MenuItem from "@material-ui/core/MenuItem";
import { BrowserRouter, Redirect } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { withRouter } from "react-router-dom";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import firebase from "../Config/config.js";
import CardMedia from "@material-ui/core/CardMedia";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import MsfLogo from "./msfLogo.png";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    //margin:'auto',
    fontSize: "100%",

    color: "white"
  },
  input: {
    display: "none"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }

    // alignItems: '',

    // right:'150px'
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },

  menuButton: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    color: "white"
  },

  Headlogo: {
    // margin:'auto',
    justifyContent: "left",
    position: "relative",
    right: "20%"
  },
  menu: {
    backgroundColor: "blue"
  }
});

class SearchAppBar extends Component {
  //const [getter, setter] = React.useState(false)

  //  handleClick=(event)=> {
  //     setAnchorEl(event.currentTarget);
  //   }

  //   handleClose=()=> {
  //     setAnchorEl(null);
  //   }

  constructor(props) {
    super(props);

    this.state = {
      isUserloggedIn: false,
      activeItem: "home",
      isAdminloggedIn: false,
      userName: "",
      loaderVisble: true,
      user_id: "",
      queryNotify: false,
      queryNotifyCount: 0,
      unReadQueriesId: [],

      userNotify: false,
      userNotifyCount: 0,
      unSeenuserId: []
    };
  }

  goto = path => {
    this.props.history.push(path);
  };

  handleLogout = () => {
    const that = this;

    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        that.setState({ isUserloggedIn: false, isAdminloggedIn: false });
        //window.location.reload();
        alert("logout successful");
        

        that.props.history.push("/");
      })
      .catch(function(error) {
        // An error happened.
        alert(error);
       
      });
  };

  componentDidMount = () => {
    const that = this;
    //var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.state.user_id = user.uid;
        // User is signed in.
       
       
        if (user.email === "mohammedsoban1@gmail.com" || user.email==="arkhan2@hotmail.com" || user.emai==="ovaiswaraich@gmail.com") {
          that.setState({ isAdminloggedIn: true, loaderVisble: false });
        }
        that.setState({
          isUserloggedIn: true,
          userName: user.displayName,
          loaderVisble: false
        });
      } else {
        // No user is signed in.
       
        that.setState({ isUserloggedIn: false, loaderVisble: false });
      }
    });

    const db = firebase.firestore();

    var unReadQueryHolder = [];
    var holdUnreadQueriesIdHolder = [];

    db.collection("Queries")
      .where("seen", "==", false)
      .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          

          unReadQueryHolder.push(doc.data());

          holdUnreadQueriesIdHolder.push(doc.id);
        });

        if (unReadQueryHolder.length > 0) {
          that.setState({
            unReadQueriesId: holdUnreadQueriesIdHolder,
            queryNotify: true,
            queryNotifyCount: unReadQueryHolder.length
          });
        
        }
      });

    // db.collection('Queries').where("seen", "==", false)
    // .get()
    // .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());

    //         unReadQueryHolder.push(doc.data())

    //         holdUnreadQueriesIdHolder.push(doc.id)
    //     });

    //     if(unReadQueryHolder.length>0){
    //     that.setState({
    //       unReadQueriesId:holdUnreadQueriesIdHolder,
    //       queryNotify:true,
    //       queryNotifyCount:unReadQueryHolder.length
    //     })
    //   }

    // })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });

    //////////////

    var unSeenUserHodler = [];
    var holdSeenUserIdHolder = [];

    db.collection("users")
      .where("seen", "==", false)
      .onSnapshot(function(querySnapshot) {
       
        querySnapshot.forEach(function(doc) {
         
         
          unSeenUserHodler.push(doc.data());

          holdSeenUserIdHolder.push(doc.id);
        });

        if (unSeenUserHodler.length > 0) {
          that.setState({
            unSeenuserId: holdSeenUserIdHolder,
            userNotify: true,
            userNotifyCount: unSeenUserHodler.length
          });
        }

       
       
      });

    // db.collection('users').where("seen", "==", false)
    // .get()
    // .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());

    //         unSeenUserHodler.push(doc.data())

    //         holdSeenUserIdHolder.push(doc.id)
    //     });

    //     if(unSeenUserHodler.length>0){
    //     that.setState({
    //       unSeenuserId:holdSeenUserIdHolder,
    //       userNotify:true,
    //       userNotifyCount:unSeenUserHodler.length
    //     })
    //   }

    // })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });
  };
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  endQueryNotification = () => {
    const db = firebase.firestore();

    const that = this;

  
    if (that.state.unReadQueriesId.length === 0) {
      that.goto("/queries/" + that.state.queryNotifyCount);
    } else {
      that.state.unReadQueriesId.map(id => {
        var washingtonRef = db.collection("Queries").doc(id);

        // Set the "capital" field of the city 'DC'
        return washingtonRef
          .update({
            seen: true
          })
          .then(function() {
          
            that.setState({
              queryNotify: false
            });
           
            that.goto("/queries/" + that.state.queryNotifyCount);
          })
          .catch(function(error) {
            // The document probably doesn't exist.
           
            alert("error reaching queries refresh your page please ", error);
            that.goto("/");
          });
      });
    }
  };

  endUserNotification = () => {
    const db = firebase.firestore();

    const that = this;

   
    if (that.state.unSeenuserId.length === 0) {
      that.goto("/myusers/" + that.state.userNotifyCount);
    } else {
      that.state.unSeenuserId.map(id => {
        var washingtonRef = db.collection("users").doc(id);

        // Set the "capital" field of the city 'DC'
        return washingtonRef
          .update({
            seen: true
          })
          .then(function() {
         
            that.setState({
              queryNotify: false
            });
            that.goto("/myusers/" + that.state.userNotifyCount);
          })
          .catch(function(error) {
            // The document probably doesn't exist.
       
            alert("error reaching queries refresh your page please ", error);
            that.goto("/");
          });
      });
    }
  };

  render() {
    // const classes = useStyles();

    // const [anchorEl, setAnchorEl] = React.useState(null);

    const { classes } = this.props;

    const { activeItem } = this.state;

    return (
      //   <React.Fragment>
      // {/* <Navigation/> */}

      //   <div className={classes.root}>
      //     <AppBar position="static">
      //       <Toolbar>
      //       <IconButton
      //           edge="start"
      //           className={classes.menuButton}
      //           color="inherit"
      //           aria-label="open drawer"
      //         >
      //           <MenuIcon />
      //         </IconButton>
      //         <Typography className={classes.title} variant="h6" noWrap>
      //         MOON STEEL FABRICATORS
      //         </Typography>

      //         <div className={classes.search}>
      //           <div className={classes.searchIcon}>
      //             <SearchIcon />
      //           </div>
      //           <InputBase
      //             placeholder="Search…"
      //             classes={{
      //               root: classes.inputRoot,
      //               input: classes.inputInput,
      //             }}
      //             inputProps={{ 'aria-label': 'Search' }}
      //           />
      //         </div>

      //         <Button className={classes.button}onClick={()=>this.goto('/')}>home</Button>
      //         <Button className={classes.button} onClick={()=>this.goto('/products')}> Products </Button>
      //         <Button className={classes.button}>SERVICES</Button>
      //         <Button className={classes.button}>clients</Button>
      //         <Button className={classes.button}>contact</Button>
      //         { this.state.isUserloggedIn ? (<Button className={classes.button} onClick={()=>this.handleLogout()}>Logout</Button>):
      //         (<Button className={classes.button} onClick={()=>this.goto('/login')}>Register now</Button>)
      //         }

      //       </Toolbar>
      //     </AppBar>
      //   </div>
      //   </React.Fragment>
<React.Fragment>
      <Router>
        <MDBNavbar
          color="unique-color-dark"
          dark
          expand="md"
          fixed="top"
          double={true}

          //scrolling={true}
        >
          <MDBNavbarBrand className="main-logo" onClick={() => this.goto("/")}>
            <MDBNavLink href="/">
              <img src={MsfLogo} height="50" />
            </MDBNavLink>
          </MDBNavbarBrand>

          <MDBNavbarBrand left>
            <b> <h6 className="white-text logo-text">MOON STEEL FABRICATORS</h6></b>
          </MDBNavbarBrand>

          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
              <MDBNavItem onClick={() => this.goto("/")}>
                <h5>
                  <MDBNavLink>Home</MDBNavLink>
                </h5>
              </MDBNavItem>
              <MDBNavItem onClick={() => this.goto("/products")}>
                <h5>
                  <MDBNavLink> Products</MDBNavLink>
                </h5>
              </MDBNavItem>

              <MDBNavItem onClick={() => this.goto("/services")}>
                <h5>
                  <MDBNavLink href="/">Services</MDBNavLink>
                </h5>
              </MDBNavItem>

              <MDBNavItem onClick={() => this.goto("/clients")}>
                <h5>
                  <MDBNavLink href="/">Clients</MDBNavLink>
                </h5>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavItem onClick={() => this.goto("/contactUs")}>
                  <h5>
                    <MDBNavLink href="/">Contact us</MDBNavLink>
                  </h5>
                </MDBNavItem>
              </MDBNavItem>
            </MDBNavbarNav>

            <MDBNavbarNav right>
              {this.state.loaderVisble ? (
                <Loader
                  type="ThreeDots"
                  color="green"
                  height={100}
                  width={100}
                  visible={this.state.loaderVisble}
                  //3 secs
                ></Loader>
              ) : (
                <React.Fragment>
                  <MDBNavItem>
                    {this.state.isUserloggedIn ? (
                      <MDBNavItem>
                        <MDBDropdown>
                          <h5>
                            <MDBDropdownToggle nav caret>
                              <MDBIcon icon="user" className="mr-1" />
                              {this.state.userName}
                            </MDBDropdownToggle>
                          </h5>

                          <MDBDropdownMenu className="dropdown-default" right>
                            <MDBDropdownItem
                              onClick={() => this.handleLogout()}
                            >
                              Log out
                            </MDBDropdownItem>
                            <MDBDropdownItem
                              onClick={() =>
                                this.goto("/editprofile/" + this.state.user_id)
                              }
                            >
                              EditProfile
                            </MDBDropdownItem>
                          </MDBDropdownMenu>
                        </MDBDropdown>
                      </MDBNavItem>
                    ) : (
                      <MDBNavItem onClick={() => this.goto("/login")}>
                        <h5>
                          <MDBNavLink>Register Now</MDBNavLink>
                        </h5>
                      </MDBNavItem>
                    )}
                  </MDBNavItem>

                  {this.state.isAdminloggedIn ? (
                    <MDBNavItem>
                      <MDBDropdown>
                        <h5>
                          <MDBDropdownToggle nav caret>
                            <span className="mr-2">
                              {" "}
                              {this.state.queryNotify ||
                              this.state.userNotify ? (
                                <a>
                                  <Icon loading name="bell" />{" "}
                                  {this.state.queryNotifyCount +
                                    this.state.userNotifyCount}
                                </a>
                              ) : null}{" "}
                              Actions
                            </span>
                          </MDBDropdownToggle>
                        </h5>
                        <MDBDropdownMenu>
                          <MDBDropdownItem
                            onClick={() => this.goto("/postProduct")}
                          >
                            Post Product
                          </MDBDropdownItem>
                          <MDBDropdownItem
                            onClick={() => this.endUserNotification()}
                          >
                            {this.state.userNotify ? (
                              <a>
                                <Icon loading name="bell" />{" "}
                                {this.state.userNotifyCount}
                              </a>
                            ) : null}
                            My users
                          </MDBDropdownItem>
                          <MDBDropdownItem
                            onClick={() => this.endQueryNotification()}
                          >
                            {this.state.queryNotify ? (
                              <a>
                                <Icon loading name="bell" />{" "}
                                {this.state.queryNotifyCount}
                              </a>
                            ) : null}
                            Queries
                          </MDBDropdownItem>
                          <MDBDropdownItem
                            onClick={() => this.goto("/noticeBoard")}
                          >
                            Post Notice
                          </MDBDropdownItem>
                          <MDBDropdownItem
                            onClick={() => this.goto("/addClients")}
                          >
                            Add Clients
                          </MDBDropdownItem>

                          <MDBDropdownItem
                            onClick={() => this.goto("/viewClients")}
                          >
                            View Clients
                          </MDBDropdownItem>
                        
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    </MDBNavItem>
                  ) : null}

                  <MDBNavItem></MDBNavItem>
                </React.Fragment>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </Router>


      <br/>
      <br/>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(SearchAppBar));
