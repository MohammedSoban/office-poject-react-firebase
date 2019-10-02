import React, { Component } from 'react';
import { Button, Header, Image, Modal,Icon } from 'semantic-ui-react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import firebase from '../Config/config.js'
import { throwStatement } from '@babel/types';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

const styles = theme => ({
  
    textField:{
        marginTop:'3%',
        margin:'auto',
    
        marginBottom:'5%',
       // maxWidth:'150%',
        width:'50%'
        
        },
});
class PassReset extends Component {

    constructor(props) {
        super(props);

        this.state = {
          email:'',
          emailSent:false ,
          modal: false
        }


    }

    toggle = () => {
      this.setState({
        modal: !this.state.modal,emailSent:false
      })
    }

    handleOnChange = (event) => {

        this.setState({

            [event.target.name]: event.target.value

        });
    };

   

    resetPassword=()=>{

       
 var that=this
        var auth = firebase.auth();
        var emailAddress = this.state.email;

        auth.sendPasswordResetEmail(emailAddress).then(function() {
          // Email sent.
        that.setState({
          email:'',
            emailSent:true,
            open: false
        })  

        }).catch(function(error) {
          // An error happened.
          alert(error)
        });
    }

  
    

    render() {
        const { classes } = this.props
        const { open, closeOnEscape, closeOnDimmerClick } = this.state
        return (
            <div>
     <MDBContainer>
      <MDBBtn onClick={this.toggle} color='blue' size="medium">Forgot Password?</MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Password Recovery</MDBModalHeader>
        <MDBModalBody>
          <h4>Enter your email address </h4>
        <TextField
              id="outlined-email-input"
              label="Email"
              name='email'
             value={this.state.email}
              className={classes.textField}
              type="email"
             onChange={(event) => this.handleOnChange(event)}
              autoComplete="email"
              margin="normal"
              variant="outlined"
             
            />
   
  
      {this.state.emailSent?( <p>
         A Password reset email has been sent to your account thankyou!
        </p>):(null)}
       
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
          <MDBBtn onClick={this.resetPassword} color="primary" >submit</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>


       
  
            </div>
        );
    }
}

export default withStyles(styles)(PassReset);
