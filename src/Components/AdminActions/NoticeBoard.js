import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { MDBInput } from 'mdbreact';
import firebase from '../Config/config.js'

class NoticeBoard extends Component {


  
  constructor(props) {
    super(props);



    this.state = {

    noticeTitle:'',
    noticeDescription:'',
    
     
    }

}


componentDidMount() {
  const db = firebase.firestore();
}

handleOnChange = (event) => {

  this.setState({

    [event.target.name]: event.target.value

  });
}

uploadNotice=()=>{

  const db=firebase.firestore()
var that=this

  db.collection("notice").doc('notice').set({
    noticeTitle: that.state.noticeTitle ,
    noticeDescription: that.state.noticeDescription,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    created: new Date().getTime()
})
.then(function() {

 
  alert('Notice successfully posted')
   
    that.setState({
      noticeTitle:'',
      noticeDescription:''
    })
    
})
.catch(function(error) {
   
    alert('Unable to post your notice ',error)
});

}

    render() {

      const isEnabled = this.state.noticeTitle.length > 0 && this.state.noticeDescription.length>0 
    return(
            <React.Fragment>
              
            <Header/>
            <div className='fade-in-top'>
            <div style={{ 
    minHeight:600,
    marginTop:'5%',
    margin:'center'
  }}>
            <MDBContainer>
      <MDBRow  center={true} >
        <MDBCol md="4">
          <MDBCard>
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Subscribe</p>
                <label
                  htmlFor="defaultFormCardNameEx"
                  className="grey-text font-weight-light"
                >
                 Title
                </label>
                <input
                  type="text"
                  id="defaultFormCardNameEx"
                  className="form-control"
                  onChange={(event)=>this.handleOnChange(event)}
                  name='noticeTitle'
                />
                <br />
                <label
                  htmlFor="defaultFormCardEmailEx"
                  className="grey-text font-weight-light"
                >
                  Notice
                </label>

                <MDBInput type="textarea"  outline name='noticeDescription'
                  onChange={(event)=>this.handleOnChange(event)}
                />

                <div className="text-center py-4 mt-3">
                  <MDBBtn className="btn btn-outline-purple"  onClick={()=>this.uploadNotice()} disabled={!isEnabled}>
                    Post!
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
        <Footer/>
        </div>
        </React.Fragment>
        );
    }
}

export default NoticeBoard;