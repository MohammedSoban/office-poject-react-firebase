import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { DropzoneDialog } from 'material-ui-dropzone'
import firebase from '../Config/config.js'
import { file } from '@babel/types';
import Loader from "react-loader-spinner";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class addClients extends Component {


    constructor(props) {
        super(props);



        this.state = {

            open: false,
            client_id:null,
            clientName:'',
            files:[],
            imageUrl:'',
            loaderVisible:false
           
            
                
        }

  }

componentDidMount=()=>{
    const db = firebase.firestore();

    let id =this.props.match.params.product_id
    console.log(id)
 var clientsHolder=[]
 var that=this
    db.collection("clients").get(id).then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
      
            clientsHolder.push({...doc.data(),client_id:doc.id})
        });

        that.setState({
            client:id,
            clientName:clientsHolder.clientName,
            imageUrl:clientsHolder.imageUrl
        })
    });

}
    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            fileChnages:true,
            open: false
            
        });

    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }


    handleOnChange = (event) => {

        this.setState({

            [event.target.name]: event.target.value

        });
    };

    postLogo=()=>{

   
      var that=this
      that.setState({
        loaderVisible:true
      })
        const db = firebase.firestore();
        var storageRef = firebase.storage().ref();


        var uploadTask = storageRef.child(`logos/${this.state.clientName}/${this.state.files[0].name}`).put(this.state.files[0]);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
   
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
   
      break;
  }
}, function(error) {
  // Handle unsuccessful uploads
  alert(error, "error uploading client")
  that.setState({
    loaderVisible:false
  })
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {


    that.setState({
        imageUrl:downloadURL
    })

    db.collection("clients").doc().set({
       clientName:that.state.clientName,
       imageUrl:that.state.imageUrl
    })
    .then(function() {

        that.setState({
          clientName:'',
          file:''
        })
        that.setState({
          loaderVisible:false
        })
        alert('client successfully uploaded')
    })
    .catch(function(error) {

        that.setState({
          loaderVisible:false
        })
         alert('error uploading client ',error)
    });


  });
});
    }

    render() {
        const { classes } = this.props
        return (

            <React.Fragment>
               <Header/>
            <div style={{ 
                minHeight:600,
                marginTop:'5%',
                margin:'center'
              }}>
                <MDBContainer>
      <MDBRow center={true}>
        <MDBCol md="6">
          <form>
            <p className="h4 text-center py-4">Add Clients</p>
            <label
              htmlFor="defaultFormCardNameEx"
              className="grey-text font-weight-light"
            >
              Client Name 
            </label>
            <input
              type="text"
              id="defaultFormCardNameEx"
              className="form-control"
              name='clientName'
              value={this.state.clientName}
              onChange={(event)=>this.handleOnChange(event)}
            />
            <br />

            <img src={this.state.imageUrl} widht='70' height='70'/>
                 <IconButton aria-label="delete"
                 onClick={() => this.handelOnDeleteImage()}>
                 <DeleteIcon fontSize="large" />
             </IconButton>
             <br/>
            <MDBBtn outline color="primary"  onClick={this.handleOpen.bind(this)}>     Add logo </MDBBtn>

   
            <DropzoneDialog
                    open={this.state.open}
                   onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp','image/gif']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    filesLimit={1}
                    onClose={this.handleClose.bind(this)}
                   
                    
                />
            <div className="text-center py-4 mt-3">
              <MDBBtn className="btn btn-outline-purple" onClick={()=>this.postLogo()}>
                Post
                <MDBIcon far icon="paper-plane" className="ml-2" />
              </MDBBtn>
            </div>
          </form>
          <Loader
                  type="ThreeDots"
                  color="green"
                  height={100}
                  width={100}
                  visible={this.state.loaderVisible}
                  //3 secs
                ></Loader>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
            </div>
            <Footer/>
            </React.Fragment>
        );
    }
}

export default addClients