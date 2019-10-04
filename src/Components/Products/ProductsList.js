//import React from 'react';
import React, { Component } from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Header from '../Header/Header'
import ProductPictures from '../Clients/ProductPictures'
import { ButtonBase } from '@material-ui/core';
import {withRouter} from 'react-router-dom'
import firebase from '../Config/config.js'
import { Grid, Image,Card,Icon } from 'semantic-ui-react'
import { Rating } from 'semantic-ui-react'
import { CardContent } from '@material-ui/core';
import { identifier, throwStatement } from '@babel/types';
import { error } from 'util';
import Loader from 'react-loader-spinner'
import Footer from '../Footer/Footer'
import ProductView from './ProductView'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'
import { Modal } from 'semantic-ui-react'
import { MDBCol, MDBInput } from "mdbreact";


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
  // Footer:{
  //   paddingTop:'10%'
  // }
});

function searchingFor(search){
  return function(x){
   return x.productName.toLowerCase().includes(search.toLowerCase()) || !search
  }
}

class SpacingGrid extends Component {

  constructor(props) {
    super(props);



    this.state = {

      spacing:2,
      products:[],
      loaderVisible:true,
      productIndex:'',
      isAdminloggedIn:true,
      loaderVisibleOnDelete:false,
      search:''
    
     
    }

}

 

  //const [spacing, setSpacing] = React.useState(2);
 

 
 componentDidMount(){

  const that = this;
    
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          if(user.email==='mohammedsoban1@gmail.com'){
            that.setState({isAdminloggedIn:true})
          }
        } else {
          // No user is signed in.
          console.log("no user")
          that.setState({isUserloggedIn:false});
        }
      });



 
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

  handeleOnDelete=(index,product_id,productName,fileNames)=>{
 
   this.setState({
     loaderVisibleOnDelete:true
   })
    console.log(productName)
   var that=this

    const db =firebase.firestore();

   db.collection("Products").doc(product_id).delete().then(function() {
    console.log("Document successfully deleted!");
    that.state.products.splice(index,1)

    that.setState({
      products: that.state.products,
      loaderVisibleOnDelete:false
   });
  

   alert('Product Deleted Sucessfully')

   for(var i=0;i<fileNames.length;i++){
    var storageRef = firebase.storage().ref();
    var desertRef = storageRef.child(`images/${productName}/${fileNames[i]}`);

// Delete the file
desertRef.delete().then(function() {
  // File deleted successfully


}).catch(function(error) {
  // Uh-oh, an error occurred!
 alert(error)
});
   }   

}).catch(function(error) {
    console.error("Error removing document: ", error);
    alert("Error deleting product: ", error)
});

  }

  handleOnSearch=(event)=>{

    this.setState({search:event.target.value})
  }

  render(){

    

    const { classes } = this.props


    const {search,products}=this.state

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


                                 
      <MDBCol md="12" >
      <MDBInput
      value={this.state.search} onChange={(event)=>this.handleOnSearch(event)} hint="Search" size='lg' type="text" containerClass="active-pink active-pink-2 mt-0 mb-3" />
    </MDBCol>
    
    <div style={{
      minHeight:600
    }}>
{this.state.loaderVisibleOnDelete?(  
   <Loader 
  type="ThreeDots"
  color="green"
  height={100}
  width={100}
  visible={this.state.loaderVisibleOnDelete}
  //3 secs 
  ></Loader>):(     
   

   

    <Grid doubling={true} columns={5}
 // container={true}
  padded={2}
  stackable={true}
  >
      
    <br/>
   
{
  

     products.filter(searchingFor(search)).map((product,index)=>{
       return(
        
    <Grid.Column padded={2} > 
 <Link to={'productView/'+ product.product_id} target='_blank'>
     <Card.Group>
      
      <Card
      
      className={classes.Card}
      centered={true}
    // fluid={true}
    onClick
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
  <br/>
  <Card.Content extra >
      {this.state.isAdminloggedIn?(
          <div >
            <Link to={'editProduct/'+product.product_id}>
          <Button  primary size='tiny' >Edit</Button>
          </Link>
          <Button  secondary color='red' size='tiny' onClick={()=>this.handeleOnDelete(index,product.product_id,product.productName,product.fileNames)}>Delete</Button> 
   
                    
                         
          </div>
      ):(null)

      }
      
    </Card.Content>
   
    </Grid.Column>
    
     )})
    
  
    
}
    
    
  </Grid>
  
)}     
</div>
{ !this.state.loaderVisible && !this.state.loaderVisibleOnDelete ?(
 
<Footer/>

):(<br/>)
}     

</React.Fragment>
  );
                }
}

export default withRouter(withStyles(styles)(SpacingGrid));

