import React, { Component } from 'react';
import firebase from '../Config/config.js'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Card, Icon, Image } from 'semantic-ui-react'
import { style } from '@material-ui/system';

class ProductView extends Component {


    state={
        id:null,
        product:{},
        images:[{}]
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

var realImages=[{}]


    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
    alert(error)
})






// for(index=0;index<=this.state.product.imageUrls.length;index++){
// images[index].original=this.state.product.imageUrls[index]
// images[index].thumbnail=this.state.product.imageUrls[index]
// }

}

    render() {
        const images = [
            {
              original:this.state.product.imageUrls,
              thumbnail: this.state.product.imageUrls,
            },
            {
              original: 'https://picsum.photos/id/1015/1000/600/',
              thumbnail: 'https://picsum.photos/id/1015/250/150/',
            },
            {
              original: 'https://picsum.photos/id/1019/1000/600/',
              thumbnail: 'https://picsum.photos/id/1019/250/150/',
            },
          ];
      
        return (
        


<Card
centered={true}
><Card.Content>

              
              <ImageGallery
                items={this.state.images}
                showIndex={true}
               // onImageLoad={true}
               // useBrowserFullscreen={false}
        // showFullscreenButton={true} 
        
         showThumbnails={true} />
               
</Card.Content>
</Card>
        );
    }
}

export default ProductView;