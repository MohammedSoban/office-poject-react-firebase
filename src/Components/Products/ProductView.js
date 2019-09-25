import React, { Component } from 'react';
import firebase from '../Config/config.js'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import { style, typography } from '@material-ui/system';
import {withStyles } from '@material-ui/core/styles';
import Headers from '../Header/Header'
import Footer from '../Footer/Footer'
import ReactImageMagnify from 'react-image-magnify';
//import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Loader from 'react-loader-spinner'
import Typography from '@material-ui/core/Typography';
import { Grid, Image,Card } from 'semantic-ui-react'
import { Tab ,Table} from 'semantic-ui-react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import Commentss from './Comments'
import { FacebookProvider, Comments,CommentsCount } from 'react-facebook';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      marginTop:"2%",
    //  paddingBottom:"2%",
      height: 400,
      width: 400,
      margin:'auto',
      
    },
    control: {
      padding: theme.spacing(2),
    },
    img: {
     
      display: 'block',
       height:150,
      overflow: 'hidden',
      width: '100%',
      //display: 'block'
  
    },
    CardContentGallery: {
        //marginTop:'5%',
       // marginLeft:'5%',
        //background: 'white',
        height:800,
        maxWidth: 1000,
       // margin:'auto'
      
       
      },
    Card: {
        marginTop:'5%',
        marginLeft:'5%',
        background: 'white',
        height:600,
        maxWidth: 1000,
        display: 'flex',
       
       // margin:'auto'
      },
      headings:{
        height:50,
        maxWidth: 100,
        
      }
  });

class ProductView extends Component {


    state={
        id:null,
        product:{},
        images:[{}],
        loaderVisible:true,
        showTable:true
    }

componentDidMount(){
    const db = firebase.firestore();
    var that=this
    const tempImages=[]

    let id =this.props.match.params.product_id
   // debugger
   this.setState({
       id:id
   })

   var docRef = db.collection("Products").doc(id);

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());

        var obj={}

        obj=doc.data()

    that.setState({
          product:obj
    })
       
    var index

   for(index=0;index<obj.imageUrls.length;index++){
       tempImages.push({original:obj.imageUrls[index],thumbnail:obj.imageUrls[index]}) 
}




   console.log(tempImages)

   that.setState({
       images:tempImages
   })

   console.log(that.state.images)



if(that.state.images.length===tempImages.length){

 that.setState({
     loaderVisible:false
 })
}


console.log(obj.productSpecification.length)

if(obj.productSpecification.length===0){
  that.state.product.productSpecification.push('N/A')
  that.setState({
    showTable:false
  })
}

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
    alert(error)
})




}

    render() {
   
        const { classes } = this.props

        return (
        
<React.Fragment>

<Headers/>

{

    this.state.loaderVisible?(
<Loader 
    type="ThreeDots"
    color="green"
    height={100}
    width={100}
    visible={this.state.loaderVisible}
    //3 secs 
    ></Loader>
    ):(

        <React.Fragment>

<Grid celled='internally'>
    <Grid.Row>
      <Grid.Column width={3}>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
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
      <Grid.Column width={3}>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row centered={true}> 
     
      <Grid.Column width={10}>
      <Typography variant='h3' display='block'>
        {this.state.product.productName}
        </Typography>
        <br/>
     
          <br/>
        <Typography variant='h4' display='block'>
        Product Detail
        </Typography>
        <Typography variant='body1' display='block'>
        {this.state.product.productDetails}
        </Typography>





   

  <Table unstackable>
    <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Specification</Table.HeaderCell>
        
        <Table.HeaderCell>Detail</Table.HeaderCell>
        
      </Table.Row>
    </Table.Header>
{

this.state.showTable?(
  this.state.product.productSpecification.map(spec=>{
  return(
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
):(this.state.product.productSpecification.map(spec=>{
  return(
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

<Footer/>
</React.Fragment>
    )
  
}




</React.Fragment>
        );
    }
}

export default withStyles(styles)(ProductView);
