import React,{Component} from 'react';
import { Input, Menu } from 'semantic-ui-react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles, getContrastRatio } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';
import {BrowserRouter,Redirect} from 'react-router-dom';
import Navigation from '../Navigation/Navigation'
import {withRouter} from 'react-router-dom'
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import firebase from '../Config/config.js'
import CardMedia from '@material-ui/core/CardMedia';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,MDBIcon
  } from "mdbreact";
  import { BrowserRouter as Router } from 'react-router-dom';
import MsfLogo from './msfLogo.png'
import Loader from 'react-loader-spinner'

const styles =(theme => ({
  button: {
    margin: theme.spacing(1),
    //margin:'auto',
    fontSize:'100%',
    
    color: 'white'
  },
  input: {
    display: 'none',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    
   // alignItems: '',

   // right:'150px'
   
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },

  menuButton:{
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color:'white'
  },

  Headlogo:{
   // margin:'auto',
    justifyContent:'left',
    position:'relative',
    right:'20%'
  },
  menu:{
          backgroundColor: 'blue'
  }

}));



class SearchAppBar extends Component{

  //const [getter, setter] = React.useState(false)


//  handleClick=(event)=> {
//     setAnchorEl(event.currentTarget);
//   }

//   handleClose=()=> {
//     setAnchorEl(null);
//   }


constructor(props) 
{ 

    super(props); 

   

    this.state={
      isUserloggedIn:false,
      activeItem:'home',
      isAdminloggedIn:false,
      userName:'',
      loaderVisble:true
}

} 

   goto=(path)=>{

  this.props.history.push(path);

  
  }

  handleLogout=()=>{
    
    const that = this;

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      that.setState({isUserloggedIn:false,
      isAdminloggedIn:false});
      //window.location.reload();
      alert('logout successful')
      console.log('iam if logout')

    that.props.history.push('/')

    }).catch(function(error) {
      // An error happened.
      alert(error)
      console.log('iam else logout')
    });

  }
  
  
  componentDidMount=()=>{
  
   
    
    const that = this;
    //var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user){
      if (user) {
       
        // User is signed in.   
        console.log("i am if cdm "+ user.email+" "+user.uid )
        console.log(user.displayName)
        if(user.email==='mohammedsoban1@gmail.com'){
          that.setState({isAdminloggedIn:true,loaderVisble:false})
          
        }
        that.setState({isUserloggedIn:true,
        userName:user.displayName,
      loaderVisble:false});
        
      } else {
      
        // No user is signed in.
       console.log("i am else cdm")
        that.setState({isUserloggedIn:false,loaderVisble:false});
      }
    });
    
    }
  toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

  render(){

    // const classes = useStyles();

  // const [anchorEl, setAnchorEl] = React.useState(null);

 const {classes}=this.props  

 const {activeItem}=this.state
 
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
  

  <Router>
  <MDBNavbar color='unique-color-dark'  dark expand="md"
  double={true}

  //scrolling={true}

 >


<MDBNavbarBrand onClick={()=>this.goto('/')} >
<MDBNavLink href="/" >
      <img src={MsfLogo}  height='50'  />
      </MDBNavLink>
    </MDBNavbarBrand>
   


    <MDBNavbarBrand left>
      <strong className="white-text">MOON STEEL FABRICATORS</strong>
    </MDBNavbarBrand>

    <MDBNavbarToggler onClick={this.toggleCollapse} />
    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
      <MDBNavbarNav right>
        <MDBNavItem onClick={()=>this.goto('/')} >
          <h5>
          <MDBNavLink >Home</MDBNavLink>
          </h5>
        </MDBNavItem>
        <MDBNavItem onClick={()=>this.goto('/products')}>
        <h5>
          <MDBNavLink> Products</MDBNavLink>
          </h5>
        </MDBNavItem>

       
        
        <MDBNavItem onClick={()=>this.goto('/services')}>
        <h5>
          <MDBNavLink href="/">Services</MDBNavLink>
        </h5>
        </MDBNavItem>

        <MDBNavItem onClick={()=>this.goto('/clients')}>
        <h5>
          <MDBNavLink href="/">Clients</MDBNavLink>
        </h5>
        </MDBNavItem>
        <MDBNavItem>

        <MDBNavItem onClick={()=>this.goto('/contactUs')}>
        <h5>

          <MDBNavLink href="/">Contact us</MDBNavLink>
        </h5>
        </MDBNavItem>
        </MDBNavItem>
        
        
        




 

      </MDBNavbarNav>

      
      
      <MDBNavbarNav right>
        <MDBNavItem>
          
          {this.state.isUserloggedIn ? (  <MDBNavItem>
  <MDBDropdown>
  <h5>
    <MDBDropdownToggle nav caret>
      <MDBIcon icon="user" className="mr-1" />{this.state.userName}
    </MDBDropdownToggle>
      </h5>
    <MDBDropdownMenu className="dropdown-default" right>
      <MDBDropdownItem onClick={()=>this.handleLogout()}>Log out</MDBDropdownItem>
    </MDBDropdownMenu>
  </MDBDropdown>
</MDBNavItem>):
        (<MDBNavItem onClick={()=>this.goto('/login')}>
          <h5>
        <MDBNavLink >Register Now</MDBNavLink>
        </h5>
      </MDBNavItem>)
         }



        </MDBNavItem>
     
{this.state.isAdminloggedIn?(

  <MDBNavItem>
    <MDBDropdown>
    <h5>
  
      <MDBDropdownToggle nav caret>
      
        <span className="mr-2">Actions</span>
        
      </MDBDropdownToggle>
    </h5>
      <MDBDropdownMenu>
        <MDBDropdownItem onClick={()=>this.goto('/postProduct')}>Post Product</MDBDropdownItem>
        <MDBDropdownItem onClick={()=>this.goto('/myusers')}>My users</MDBDropdownItem>
        <MDBDropdownItem onClick={()=>this.goto('/queries')}>Queries</MDBDropdownItem>
        <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
        <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  </MDBNavItem>
  ):(null)
  }
  
        <MDBNavItem>

        </MDBNavItem>
      </MDBNavbarNav>

      

    </MDBCollapse>
  </MDBNavbar>
</Router>
)
  
}

}

export default withRouter(withStyles(styles)(SearchAppBar));