import React, { Component } from 'react';
import firebase from '../Config/config.js'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import { style, typography } from '@material-ui/system';
import { withStyles } from '@material-ui/core/styles';
import Headers from '../Header/Header'
import Footer from '../Footer/Footer'
import ReactImageMagnify from 'react-image-magnify';
//import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Loader from 'react-loader-spinner'
import Typography from '@material-ui/core/Typography';
import { Grid, Image, Card } from 'semantic-ui-react'
import { Tab, Table } from 'semantic-ui-react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import Commentss from './Comments'
import { FacebookProvider, Comments, CommentsCount } from 'react-facebook';
import ProductPicture from '../Clients/ProductPictures'
import { Rating } from 'semantic-ui-react'
// import { Icon } from '@material-ui/core';
import { Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: "2%",
    //  paddingBottom:"2%",
    height: 400,
    width: 400,
    margin: 'auto',

  },
  control: {
    padding: theme.spacing(2),
  },
  img: {

    display: 'block',
    height: 150,
    overflow: 'hidden',
    width: '100%',
    //display: 'block'

  },
  CardContentGallery: {
    //marginTop:'5%',
    // marginLeft:'5%',
    //background: 'white',
    height: 800,
    maxWidth: 1000,
    // margin:'auto'


  },
  Card: {
    marginTop: '5%',
    marginLeft: '5%',
    background: 'white',
    height: 600,
    maxWidth: 1000,
    display: 'flex',

    // margin:'auto'
  },
  headings: {
    height: 50,
    maxWidth: 100,

  }
});

class ProductView extends Component {


  state = {
    product_id: null,
    user_id: null,
    product: {},
    images: [{}],
    loaderVisible: true,
    showTable: true,
    rating: 0,
    isUserLoggedin: false,
    alreadyRated: false,
    userRated: 0,
    productRatings: [],
    overAllRating: 0,
  }

  componentDidMount() {
    const db = firebase.firestore();
    var that = this
    const tempImages = []

    let id = this.props.match.params.product_id
    // debugger
    this.setState({
      product_id: id
    })

    var docRef = db.collection("Products").doc(id);

    docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());

        var obj = {}

        obj = doc.data()

        that.setState({
          product: obj
        })

        var index

        for (index = 0; index < obj.imageUrls.length; index++) {
          tempImages.push({ original: obj.imageUrls[index], thumbnail: obj.imageUrls[index] })
        }




        console.log(tempImages)

        that.setState({
          images: tempImages
        })

        console.log(that.state.images)



        if (that.state.images.length === tempImages.length) {

          that.setState({
            loaderVisible: false
          })

        }


        console.log(obj.productSpecification.length)

        if (obj.productSpecification.length === 0) {
          that.state.product.productSpecification.push('N/A')
          that.setState({
            showTable: false
          })
        }

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
      alert(error)
    })

    firebase.auth().onAuthStateChanged(function (user) {

      if (user) {
        that.setState({
          user_id: user.uid,
          isUserLoggedin: true
        })

        const db = firebase.firestore();

        debugger
        console.log(that.state.product_id)
        var alreadyRatedHolder = []
        db.collection("ratings").where("product_id", "==", `${that.state.product_id}`).where("user_id", "==", `${user.uid}`)
          .onSnapshot(function (querySnapshot) {

            querySnapshot.forEach(function (doc) {
              //console.log(doc.id, " => ", doc.data());
              alreadyRatedHolder.push(doc.data())
            });
            console.log(alreadyRatedHolder)
            if (alreadyRatedHolder.length != 0) {
              that.setState({
                alreadyRated: true,
                userRated: alreadyRatedHolder[0].rating
              })
            } else {
              that.setState({
                alreadyRated: false
              })
            }
          });

      } else {

        // No user is signed in.
        that.setState({
          isUserLoggedin: false,
          alreadyRated: false
        })
      }
    });



    debugger
    console.log(that.state.product_id)
    var productRatingHodler = []
    db.collection('ratings').where("product_id", "==", `${id}`)
      .onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          debugger

          productRatingHodler.push({ ...doc.data(), rating_id: doc.id })
          debugger
        })
        that.setState({
          productRatings: productRatingHodler
        })

        var sumOfRatings = 0
        var overAllRatingHolder = 0
        that.state.productRatings.map((productRating, index) => {

          sumOfRatings = productRating.rating + sumOfRatings
        })

        overAllRatingHolder = sumOfRatings / that.state.productRatings.length

        console.log(sumOfRatings)
        console.log(overAllRatingHolder)

        that.setState({
          overAllRating: overAllRatingHolder
        })



      })

  }

  handleOnRating = (event, rating) => {

    var that = this
    this.setState({
      rating: rating,
      alreadyRated: true
    })

    console.log(this.state.rating)
    const db = firebase.firestore();

    db.collection("ratings").doc().set({
      rating: rating,
      user_id: that.state.user_id,
      product_id: that.state.product_id,
      seen: false
    })
      .then(function () {
        console.log("Document successfully written!");
        alert('you have sccuessfully rated the product thank you')
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
        alert('Unable to rate the product', error)
      });

  }

  goto = (path) => {

    this.props.history.push(path)

  }

  render() {

    const { classes } = this.props

    return (

      <React.Fragment>

        <Headers />

        {

          this.state.loaderVisible ? (
            <Loader
              type="ThreeDots"
              color="green"
              height={100}
              width={100}
              visible={this.state.loaderVisible}
            //3 secs 
            ></Loader>
          ) : (

              <React.Fragment>

                <Grid celled='internally'
                  stackable>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <h3>Clients</h3>
                      <ProductPicture />
                    </Grid.Column>
                    <Grid.Column width={10}>

                      <ImageGallery
                        items={this.state.images}
                        showIndex={true}
                        //lazyLoad={true}
                        // onImageLoad={true}
                        // useBrowserFullscreen={false}
                        // showFullscreenButton={true} 
                        showPlayButton={false}

                      //showNav={false}

                      />
                    </Grid.Column>

                  </Grid.Row>

                  <Grid.Row centered={true}>

                    <Grid.Column width={10}>
                      <h3>Overall ratins</h3>
                      <div>
                        <Rating icon='star' defaultRating={this.state.overAllRating} rating={this.state.overAllRating} maxRating={5} disabled={true} /> ({this.state.productRatings.length})</div>
                      <br />
                      <Typography variant='h3' display='block'>
                        {this.state.product.productName}
                      </Typography>
                      <br />

                      <br />
                      <Typography variant='h4' display='block'>
                        Product Detail
                      </Typography>
                      <Typography variant='body1' display='block'>
                        {this.state.product.productDetails}
                      </Typography>



                      <br />
                      <h3>Rate our product <Icon name='smile outline' /> </h3>
                      {/* <div>{ console.log(!this.state.isUserLoggedin,'!')} {console.log(!this.state.alreadyRated,'!')} { console.log(this.state.isUserLoggedin)} {console.log(this.state.alreadyRated)}</div> */}


                      {!this.state.isUserLoggedin ? (<p>register now to rate our products <button class="ui primary button" size='small' onClick={() => this.goto('/signup')}>Register Now</button></p>) : (null)}
                      {this.state.alreadyRated ? (<p>You have rated this product with {this.state.userRated} stars thank you for you feedback</p>) : (null)}
                      {this.state.alreadyRated ? (<div><Rating icon='star' defaultRating={this.state.userRated} rating={this.state.userRated} maxRating={5} disabled={true} clearable={false} /></div>) : (<Rating icon='star' defaultRating={0} maxRating={5} rating={this.state.rating} clearable={false} disabled={!this.state.isUserLoggedin} onRate={(event, data) => this.handleOnRating(event, data.rating)} />)}




                      <Table unstackable>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Specification</Table.HeaderCell>

                            <Table.HeaderCell>Detail</Table.HeaderCell>

                          </Table.Row>
                        </Table.Header>
                        {

                          this.state.showTable ? (
                            this.state.product.productSpecification.map(spec => {
                              return (
                                <Table.Body>
                                  <Table.Row>
                                    <Table.Cell>
                                      {spec.specificationName}

                                    </Table.Cell>
                                    <Table.Cell>
                                      {spec.specificationDetail}
                                    </Table.Cell>

                                  </Table.Row>
                                </Table.Body>
                              )
                            })
                          ) : (this.state.product.productSpecification.map(spec => {
                            return (
                              <Table.Body>
                                <Table.Row>
                                  <Table.Cell>
                                    N/A
      </Table.Cell>

                                  <Table.Cell>
                                    N/A
        </Table.Cell>

                                </Table.Row>
                              </Table.Body>
                            )
                          }))
                        }
                      </Table>




                    </Grid.Column>

                  </Grid.Row>

                  <Grid.Row centered={true}>
                    <Grid.Column width={10}>

                      <FacebookProvider appId="123456789">
                        <CommentsCount href="http://www.facebook.com" />
                      </FacebookProvider>

                    </Grid.Column>
                  </Grid.Row>

                </Grid>


              </React.Fragment>
            )

        }


        {!this.state.loaderVisible ? (
          <Footer />
        ) : (<br />)
        }

      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(ProductView));
