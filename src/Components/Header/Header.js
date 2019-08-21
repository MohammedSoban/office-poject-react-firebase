import React,{Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles, getContrastRatio } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {BrowserRouter,Redirect} from 'react-router-dom';
import Navigation from '../Navigation/Navigation'
import {withRouter} from 'react-router-dom'
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";



const styles =(theme => ({
  button: {
    margin: theme.spacing(1),
    color: 'white'
  },
  input: {
    display: 'none',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
     marginRight:'40%'
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

   goto=(path)=>{

  this.props.history.push(path);

  }

  render(){

    // const classes = useStyles();

  // const [anchorEl, setAnchorEl] = React.useState(null);

 const {classes}=this.props  
 
 return (
    <React.Fragment>
  {/* <Navigation/> */}
     <div >
    <img className={classes.Headlogo} src='http://moonsteelfab.com/header.gif' />
    </div>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>  
          <Typography className={classes.title} variant="h6" noWrap>
          MOON STEEL FABRICATORS
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'Search' }}
            />
          </div>

          
          <Button className={classes.button}>home</Button>
          <Button className={classes.button} onClick={()=>this.goto('/products')}> Products </Button>
          <Button className={classes.button}>SERVICES</Button>
          <Button className={classes.button}>clients</Button>
          <Button className={classes.button}>contact</Button>
          <Button className={classes.button} onClick={()=>this.goto('/login')}>Register now</Button>

        {/* <Typography>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.menuButton}>
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      </Typography> */}

        </Toolbar>
      </AppBar>
    </div>
    </React.Fragment>
  )
}

}

export default withRouter(withStyles(styles)(SearchAppBar));