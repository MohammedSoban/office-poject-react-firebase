import React, { Component } from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Grid, Image } from 'semantic-ui-react'
import { Card, Icon } from 'semantic-ui-react'
import ovais from './ovais.jpg'
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput } from "mdbreact";
import firebase from '../Config/config.js'
import Loader from 'react-loader-spinner'

class Contact extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'Mohsin',
      email: 'mohsinghani.777@gmail.com',
      subject: 'Momo',
      message: 'Test',
      loaderVisible: false,
      emailSent: false
    }


  }

  componentDidMount() {
    const db = firebase.firestore();
  }
  handleOnChange = (event) => {

    this.setState({

      [event.target.name]: event.target.value

    });


  };




  uploadQuery = (event) => {

    // var that = this

    // that.setState({
    //   loaderVisible: true
    // })

    // //  console.log(this.state.name)


    const { name, email, subject, message } = this.state

    const db = firebase.firestore();
    debugger

    db.collection("cities").doc("LA").set({
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    })
      .then(() => {
        debugger
        console.log("Document successfully written!");
      })
      .catch((error) => {
        debugger
        console.error("Error writing document: ", error);
      });

    // return db.collection("Queries").doc().set({
    //   name: name,
    //   email: email,
    //   subject: subject,
    //   message: message,
    //   // created:firebase.firestore.FieldValue.serverTimestamp(),
    //   created: firebase.firestore.FieldValue.serverTimestamp()

    // })
    //   .then(() => {
    //     debugger
    // console.log("Document successfully written!");
    // that.setState({
    //   loaderVisible: false,
    //   emailSent: true,
    //   email: '',
    //   name: '',
    //   subject: '',
    //   message: '',
    // })
    //   alert('Query has been successfuly sent to concerning department')
    // })
    // .catch((error) => {
    //   debugger
    //   console.error("Error writing document: ", error);
    // that.setState({
    //   loaderVisible: false,
    // })
    //   alert('unable to upload ', error)

    // });
    debugger
  }

  testing = () => {
    this.setState({ loaderVisible: true })
    // const db = firebase.firestore();
    const db = new firebase.firestore()
    const { name, email, subject, message } = this.state
    // debugger
    db.collection("Queries").doc().set({
      name: name,
      email: email,
      subject: subject,
      message: message,
      created: new Date().getTime()
    })
      .then(() => {
        debugger
        this.clearState()
        alert('Query has been successfuly sent to concerning department')
      })
      .catch((error) => {
        debugger
        // console.error("Error writing document: ", error);
        this.setState({ loaderVisible: false })
        alert('unable to upload ', error)
      });
  }

  clearState = () => {
    this.setState({
      loaderVisible: false,
      emailSent: true,
      email: '',
      name: '',
      subject: '',
      message: '',
    })
  }

  render() {


    const isEnabled = this.state.email.length > 0 && this.state.name.length > 0 && this.state.subject.length > 0 && this.state.message.length > 0;

    return (

      <React.Fragment>
        <Header />


        <MDBContainer>
          <h2 className="h1-responsive font-weight-bold text-center my-5">
            Contact us
      </h2>
          <p className="text-center w-responsive mx-auto pb-5">
            If you have any queries feel free to ask!
      </p>
          <MDBRow>
            <MDBCol md="9" className="md-0 mb-5">
              <form>
                <MDBRow>
                  <MDBCol md="6">
                    <div className="md-form mb-0">
                      <MDBInput type="text" id="contact-name" label="Your name"
                        name='name'
                        value={this.state.name}
                        onChange={(event) => this.handleOnChange(event)} />
                    </div>
                  </MDBCol>
                  <MDBCol md="6">
                    <div className="md-form mb-0">
                      <MDBInput
                        value={this.state.email}
                        type="text"
                        id="contact-email"
                        label="Your email"
                        name='email'
                        onChange={(event) => this.handleOnChange(event)}
                      />
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <div className="md-form mb-0">
                      <MDBInput type="text" id="contact-subject" label="Subject"
                        name='subject'
                        value={this.state.subject}
                        onChange={(event) => this.handleOnChange(event)} />
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <div className="md-form mb-0">
                      <MDBInput
                        value={this.state.message}
                        type="textarea"
                        id="contact-message"
                        label="Your message"
                        name='message'
                        onChange={(event) => this.handleOnChange(event)}
                      />
                    </div>
                  </MDBCol>
                </MDBRow>
              </form>

              {this.state.emailSent ? (<p>Your qeury has been successfully posted thankyou!</p>)

                : (<div className="text-center text-md-left">
                  <MDBBtn color="primary" size="md"
                    onClick={(event) => this.testing(event)}
                    disabled={!isEnabled}>
                    Send
           </MDBBtn>
                </div>
                )}


              <Loader
                type="ThreeDots"
                color="green"
                height={100}
                width={100}
                visible={this.state.loaderVisible}
              //3 secs 
              ></Loader>

            </MDBCol>
            <MDBCol md="3" className="text-center">
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="http://maps.google.com/?q=Plot N.O 142, sector 24, Korangi Industrial Area" target='_blank'>
                    <MDBIcon icon="map-marker-alt" size="2x" className="blue-text" />
                    <p>Plot N.O 142, sector 24, Korangi Industrial Area, Karachi, Pakistan</p>
                  </a>
                </li>
                <li>

                  <MDBIcon icon="phone" size="2x" className="blue-text mt-4" />
                  <a href='tel:+92-21-35121145'>
                    <p>	+92-21-35121145</p>
                  </a>
                  <a href='tel:+92-21-35121146'>
                    <p>	+92-21-35121146</p>
                  </a>

                </li>
                <li>
                  <a href='mailto:moonsteelf@gmail.com'>
                    <MDBIcon icon="envelope" size="2x" className="blue-text mt-4" />
                    <p>moonsteelf@gmail.com</p>
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>



        <Grid padded={2}
          stackable={true}>
          <Grid.Row columns={3} centered={true} >
            <Grid.Column>

              <Card centered={true}>
                <Image src={ovais} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Ovais Suleman</Card.Header>
                  <Card.Meta>
                    <span className='date'>Marketing Manager</span>
                  </Card.Meta>
                  <Card.Description>
                    Matthew is a musician living in Nashville.
      </Card.Description>
                </Card.Content>
                <Card.Content extra>


                  <a href="https://api.whatsapp.com/send?phone=923002276057">

                    <Icon name='whatsapp' />
                    <strong>
                      +92-300-2276057
        </strong>
                  </a>
                  <br />


                  <a href='tel:+92-300-2276057'>
                    <Icon name='call' />
                    <strong>
                      +92-300-2276057
        </strong>
                  </a>
                  <br />

                  <a href='mailto:ovaiswaraich@gmail.com'>
                    <Icon name='mail' />
                    <strong>
                      ovaiswaraich@gmail.com
        </strong>
                  </a>

                  <br />

                  <Icon name='graduation' />
                  <strong>
                    MBA
        </strong>

                </Card.Content>
              </Card >

            </Grid.Column>
            <Grid.Column>

              <Card centered={true}>
                <Image src={ovais} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Muhammad Suleman</Card.Header>
                  <Card.Meta>
                    <span className='date'>C.E.O</span>
                  </Card.Meta>
                  <Card.Description>
                    Matthew is a musician living in Nashville.
      </Card.Description>
                </Card.Content>
                <Card.Content extra>


                  <a href="https://api.whatsapp.com/send?phone=92321822314">

                    <Icon name='whatsapp' />
                    <strong>
                      +92-321-8228314
        </strong>
                  </a>
                  <br />


                  <a href='tel:+92-321-8228314'>
                    <Icon name='call' />
                    <strong>
                      +92-321-8228314
        </strong>
                  </a>




                </Card.Content>
              </Card >

            </Grid.Column>
            <Grid.Column>

              <Card centered={true}>
                <Image src={ovais} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Abdul Rahman</Card.Header>
                  <Card.Meta>
                    <span className='date'>Marketing Manager</span>
                  </Card.Meta>
                  <Card.Description>
                    Matthew is a musician living in Nashville.
      </Card.Description>
                </Card.Content>
                <Card.Content extra>


                  <a href="https://api.whatsapp.com/send?phone=923002562246">

                    <Icon name='whatsapp' />
                    <strong>
                      +92-300-2562246
        </strong>
                  </a>
                  <br />


                  <a href='tel:+92-300-2562246'>
                    <Icon name='call' />
                    <strong>
                      +92-300-2562246
        </strong>
                  </a>
                  <br />

                  <a href='mailto:arkhan2@hotmail.com'>
                    <Icon name='mail' />
                    <strong>
                      arkhan2@hotmail.com
        </strong>
                  </a>

                  <br />

                  <Icon name='graduation' />
                  <strong>
                    MS
        </strong>

                </Card.Content>
              </Card >

            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Footer />
      </React.Fragment>

    );
  }
}

export default Contact;