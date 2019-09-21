import React,{Component} from 'react';
import ImageGallery from 'react-image-gallery';
import ReactDOM from 'react-dom'
import "react-image-gallery/styles/css/image-gallery.css";



class MyComponent extends React.Component {
 
  render() {
 
    const images = [
      {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
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

      
        
      <ImageGallery
             items={images}
      showFullscreenButton={true} 
      showThumbnails={true}/>
  

);
    
  }
 
}

export default MyComponent