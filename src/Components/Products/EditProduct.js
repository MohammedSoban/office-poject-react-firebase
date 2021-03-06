import React, { Component } from 'react';
import { useRef, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import { runInThisContext } from 'vm';
import ButtonBase from '@material-ui/core/ButtonBase';
//import { ReactComponent } from '*.svg';
import Button from '@material-ui/core/Button';
import firebase from '../Config/config.js'
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import ProgressButton from 'react-progress-button'
import ImageUploader from 'react-images-upload';
import { DropzoneDialog } from 'material-ui-dropzone'
import Loader from 'react-loader-spinner'
import { Line, Circle } from 'rc-progress';
import { thisTypeAnnotation, throwStatement } from '@babel/types';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {withRouter} from 'react-router-dom'



const styles = theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    card: {
        maxWidth: 380,
        margin: 'auto',
        marginTop: '2%',
        align: 'center'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },

    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '110%'
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    handleSpec: {
        display: 'flex',
        flexWrap: 'wrap',

    },
    button: {
        margin: theme.spacing(1),
        margin: 'auto',
        width: '100%',
        marginBottom: '5%'

    },
    input: {
        display: 'none',
    },
    progress: {
        margin: theme.spacing(2),
      },
});

class EditProduct extends Component {

    constructor(props) {
        super(props);



        this.state = {
            id:'',
            productName: '',
            productSpecification: [{
                specificationName: '',
                specificationDetail: ''
            }],
            files: [],
            productPrice: '',
            productDetails: '',
            addSpec: false,
            imageUrls: [],
            products: [],
            open: false,
            progress:0,
            loaderVisible:false,
            initialLoder:true,
            disableUplodaButton:false,
            fileNames:[],
            fileChnages:false,
            
          //  product:{}
                
        }

    }


    componentDidMount(){
        const db = firebase.firestore();
        var that=this
        const tempImages=[]
    
        let id =this.props.match.params.product_id
       // 
    
       this.setState({
           id:id
       })
    
       var docRef = db.collection("Products").doc(id);
    
    docRef.get().then(function(doc) {
        if (doc.exists) {
      
    
            var obj={}
    
            obj=doc.data()
    
    
           that.setState({
             productName:obj.productName,
             productPrice:obj.productPrice,
             productDetails:obj.productDetails,
             productSpecification:obj.productSpecification,
             files:obj.fileNames,
             imageUrls:obj.imageUrls,
             fileNames:obj.fileNames,
             initialLoder:false,
           })
        var index
        var storageRef = firebase.storage().ref();
        var listRef = storageRef.child(`images/thisisis`);

        }

    }).catch(function(error) {
        that.setState({
            initialLoder:false
          })
      
        alert(error)
    })
    

    
    
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

    handleOnChangeSpecs = (event, i, name) => {

        let spec = this.state.productSpecification
        spec[i][name] = event.target.value

        this.setState({
            productSpecification: spec
        })

        // const newProductSpecification = this.state.productSpecification.map((spec, index) => {

        //     if(i!==index) return spec;
        //     return { ...spec, specificationName: event.target.value,
        //                     specificationDetail: event.target.value };
        //   });

        //   this.setState({ productSpecification: newProductSpecification });
    }

    handleOnAddSpecs = () => {

      
      
            this.setState({

                productSpecification: [...this.state.productSpecification, {
                    specificationName: '',
                    specificationDetail: ''
                }],

            })
        }

    

    handelOnDelete(event, index) {

        this.state.productSpecification.splice(index, 1)

        this.setState({

            productSpecification: this.state.productSpecification
        })
    }

  

    handelOnUpload() {
      
        const db = firebase.firestore();
        var that=this
        let { productName,
            //  files,
              productSpecification,
              imageUrls,
              productPrice,
              productDetails,
              addSpec,
              products,
              fileNames
               } = this.state
  
          var storageRef = firebase.storage().ref();
          var urls = []
          var finalUrls=[]
          var fileName=[]
          var finalFileNames=[]
          this.setState({
              loaderVisible:true,
              disableUplodaButton:true
          })
  
         if(this.state.fileChnages===false){
             
            db.collection("Products").doc(this.state.id).set({
               
                productName:productName,
                productSpecification:productSpecification,
                imageUrls:imageUrls,
                productPrice:productPrice,
                productDetails:productDetails,
                addSpec,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                created: new Date().getTime()
             
     

            }).then(function() {
             
            
             that.setState({
                 
                 loaderVisible:false,
               disableUplodaButton:false,
               })
                alert('Product successfuly uploaded')
                that.goto('/products')
            })
            .catch((error)=>{
            alert(error)
            that.setState({
                 
                loaderVisible:false,
              disableUplodaButton:false,
              })
        })
         }else{
             
          this.state.files.map((file, index) => {
              storageRef.child(`images/${productName}/${file.name}`).put(file)
                  .then((response) => {
                     var progresss = (response.task.snapshot.bytesTransferred / response.task.snapshot.totalBytes) * 100;
                        
                 
                     
                    
                   
                     
                      fileName.push(file.name)
                      
                      

                      response.task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                          urls.push(downloadURL)
                          
                       
                         
                      }).then(()=>{
                        
                       

                    

                         
                          var sum=index+1
                          
                      
                          

                          if(this.state.files.length===urls.length){
                            finalUrls=this.state.imageUrls.concat(urls)
                            finalFileNames=this.state.fileNames.concat(fileName)
                            this.setState({
                                imageUrls: finalUrls,
                                fileNames:finalFileNames
                              })
                          }
  
                          if(this.state.files.length===urls.length){
                          
                        

                          let { productName,
                            files,
                             productSpecification,
                             imageUrls,
                             productPrice,
                             productDetails,
                             addSpec,
                             products,
                            fileNames } = this.state
               
               
                           //   let obj = {
                           //     productName,
                           //     productSpecification,
                           //     imageUrls,
                           //     productPrice,
                           //     productDetails,
                           //     addSpec
                           // }
                   
                           // products.push(obj)
                   
                           var that = this;
                   
                               db.collection("Products").doc(this.state.id).set({
               
                                   productName:productName,
                                   productSpecification:productSpecification,
                                   imageUrls:imageUrls,
                                   productPrice:productPrice,
                                   productDetails:productDetails,
                                   addSpec,
                                   fileNames:fileNames,
                                   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                   created: new Date().getTime()

                               }).then(function() {
                                
                               
                                that.setState({
                                    
                                    loaderVisible:false,
                                  disableUplodaButton:false,
                                  fileChnages:false
                                  })
                                  
                                   alert('Product successfuly uploaded')
                                   that.goto('/products')
                               })
                               .catch((error)=>{
                                that.setState({
                 
                                    loaderVisible:false,
                                  disableUplodaButton:false,
                                  })
                               alert(error)
                           })

                          }
                      }).catch((error)=>{
                        that.setState({
                 
                            loaderVisible:false,
                          disableUplodaButton:false,
                          })
                         alert(error)
                      })
                      
                  })
  
                  
          })
        }
    }




    onDrop(productPictures) {
        this.setState({
            productPictures: this.state.productPictures.concat(productPictures),
        });
    }

    handelOnDeleteImage=(index)=>{
      
        this.state.imageUrls.splice(index,1)
  
        this.setState({
            imageUrls:this.state.imageUrls
        })
 
        
    }

    goto=(path)=>{

        this.props.history.push(path)
     
      }

    render() {
        
        const { classes } = this.props


        return (

           <React.Fragment>
<Header/>

{this.state.initialLoder?(<Loader
    type="ThreeDots"
    color="green"
    height={100}
    width={100}
    visible={this.state.initialLoader}
  //3 secs 
  >Fetching Data</Loader>):(<Card className={classes.card}>
               
    <CardContent>
     
                       



        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="outlined-name"
                label="Product Name"
                name='productName'
                className={classes.textField}
                value={this.state.productName}
                onChange={(event) => this.handleOnChange(event)}
                margin="normal"
                variant="outlined"
            />

            <TextField
                id="outlined-number"
                label="Price"
                name='productPrice'
                value={this.state.productPrice}
                onChange={(event) => this.handleOnChange(event)}
                type="number"
                className={classes.textField}
                margin="normal"
                variant="outlined"
            />

            <TextField
                id="outlined-multiline-static"
                label="Product Details"
                multiline
                rows="4"
                rowsMax='4'
               maxLength="3"
               type='text'
               inputProps={{ maxLength: 200 }}
                value={this.state.productDetails}
                name='productDetails'
                onChange={(event) => this.handleOnChange(event)}
                className={classes.textField}
                margin="normal"
                variant="outlined"
            />

         {this.state.imageUrls.map((image,index)=>{
             return(
        
                <CardContent>
                 <img src={image} widht='70' height='70'/>
                 <IconButton aria-label="delete" className={classes.margin}
                 onClick={() => this.handelOnDeleteImage(index)}>
                 <DeleteIcon fontSize="large" />
             </IconButton>
             </CardContent>
             );
         })
         }



           




            {




                this.state.productSpecification.map((spec, index) => {

                    return (




                       
                            <div className={classes.container} key={index}>
                                <TextField
                                    id="outlined-name"
                                    label="Specification Name"

                                    className={classes.textField}
                                    value={spec.specificationName}
                                    onChange={(event) => this.handleOnChangeSpecs(event, index, 'specificationName')}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Specification Details"
                                    multiline
                                    value={spec.specificationDetail}
                                    rows="4"
                                    
                                    onChange={(event) => this.handleOnChangeSpecs(event, index, 'specificationDetail')}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                />

                                <IconButton aria-label="delete" className={classes.margin}
                                    onClick={(event) => this.handelOnDelete(event, index)}>
                                    <DeleteIcon fontSize="large" />
                                </IconButton>
                            </div>
                       
                    )
                })
            }


            <div>
                <Typography variant='h5' display='inline' align='center'>Add specifications </Typography>
                <ButtonBase onClick={(event) => this.handleOnAddSpecs(event)}>
                    <Fab color="primary" aria-label="add" className={classes.fab}>
                        <AddIcon
                        />
                    </Fab>
                </ButtonBase>


                <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleOpen.bind(this)}
                 disabled={this.state.disableUplodaButton}>
                    Add images
                </Button>

                
                
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    filesLimit={20}
                    onClose={this.handleClose.bind(this)}
                   
                    
                />

                    
                        
                

                <Button variant="outlined" color="primary" className={classes.button}
                    onClick={() => this.handelOnUpload()}
                    disabled={this.state.disableUplodaButton}>
                    UPLOAD!
                </Button>

                <Loader 
                        type="ThreeDots"
                        color="green"
                        height={100}
                        width={100}
                        visible={this.state.loaderVisible}
                        //3 secs 
                        ></Loader>
            </div>

        </form>
    
    </CardContent>
    
</Card>)}
            
            <Footer/>
            </React.Fragment>

        )
    };
}

export default withRouter(withStyles(styles)(EditProduct));