//import React from 'react';
import React, { Component } from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Header from '../Header/Header'
import ProductPictures from './productPictures'
import { ButtonBase } from '@material-ui/core';
import {withRouter} from 'react-router-dom'
import firebase from '../Config/config.js'
import { Grid, Image,Card,Icon } from 'semantic-ui-react'
import { Rating } from 'semantic-ui-react'
import { CardContent } from '@material-ui/core';
import { identifier } from '@babel/types';
import { error } from 'util';
import Loader from 'react-loader-spinner'
import Footer from '../Footer/Footer'
import ProductView from './ProductView'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop:"2%",
  //  paddingBottom:"2%",
    height: 400,
    width: 400,
    margin:'auto'
    
  },
  control: {
    padding: theme.spacing(2),
  },
  img: {
   
    display: 'block',
     height:150,
    overflow: 'hidden',
    width: '100%',

  },
  Card: {

    
   height:430,
   width: '100%',
    

  },
});

class SpacingGrid extends Component {

  constructor(props) {
    super(props);



    this.state = {

      spacing:2,
      products:[],
      loaderVisible:true,
      productIndex:''
     
    }

}

 

  //const [spacing, setSpacing] = React.useState(2);
 

 
 componentDidMount(){
  var that=this;
  const db = firebase.firestore();

//   db.collection("Products").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data().productDetails);
//         const productsHolder=[]
//         debugger
      
//       productsHolder.push(doc.data())
//       that.setState({
//         products:productsHolder
//       })
      
//       console.log(that.state.products,'state')
//     });

   
// });


db.collection("Products").get().then((snapshot)=>{
  //console.log(snapshot.docs)
  const productsHolder=[]
  //var index=0;
  snapshot.docs.forEach((doc,index)=>{
 
    



   // services.push({ ...doc.data(), vid: doc.id });

    
    productsHolder.push({...doc.data(),product_id:doc.id})
    //productsHolder[index]=
     
   console.log(productsHolder.length,productsHolder)
     
   

    that.setState({
              products:productsHolder,
              loaderVisible:false
            })
    
            console.log(this.state.products)


  })
})

 }

 goto=(path)=>{

  
  
  this.props.history.push(path);
       

  }


  render(){

    

    const { classes } = this.props



  return (
    <React.Fragment>
      
    <Header/>
    
                                   <Loader 
                                    type="ThreeDots"
                                    color="green"
                                    height={100}
                                    width={100}
                                    visible={this.state.loaderVisible}
                                    //3 secs 
                                    ></Loader>
                               

    <Grid doubling={true} columns={5}
 // container={true}
  padded={2}
  stackable={true}
  >
  
{
  

     this.state.products.map((product,index)=>{
       return(
        
    <Grid.Column padded={2}> 
 <Link to={'productView/'+ product.product_id}>
     <Card.Group>
      
      <Card
      className={classes.Card}
      centered={true}
    // fluid={true}
    //onClick
     color='olive'
   
     >
       
     
       

       {/* <img className={classes.img} src={product.imageUrls} alt={product.label} /> */}
       <Image className={classes.img} size={"small"} src={product.imageUrls} wrapped ui={false} />
    <Card.Content>
      
   
      <Card.Header>{product.productName}</Card.Header>
      <Card.Meta>{product.productPrice} RS</Card.Meta>
      <Card.Description
      >
        {product.productDetails}
      </Card.Description>
      
    </Card.Content>
    <Card.Content extra>
      <a>
      <Rating defaultRating={3.5} maxRating={5} disabled />
      </a>
    </Card.Content>
  </Card>
 
  </Card.Group>
  </Link>
    </Grid.Column>
    
     )})
}
    
  </Grid>
      
      
{ !this.state.loaderVisible?(
<Footer/>
):(<br/>)
}     
    </React.Fragment>
  );
                }
}

export default withRouter(withStyles(styles)(SpacingGrid));

