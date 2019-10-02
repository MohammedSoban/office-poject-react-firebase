import React, { Component } from 'react';
import { Container,Header } from 'semantic-ui-react'
import Headers from '../Header/Header'
import Footer from '../Footer/Footer'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Grid, Image } from 'semantic-ui-react'
import FND from './FND.jpg'
import hbl from './hbl.jpg'
import PIZZAHUT from './PIZZAHUT.jpg'
import PIZZAHUTC from './PIZZAHUTC.jpg'
import TAQ from './TAQ.jpg'
import TECHNICAL from './TECHNICAL.jpg'

import Costa from './costa.gif'
import dd from './dd.gif'
//import dd from './dd.png'
import akuh from './AKUH.gif'
import ImageGallery from 'react-image-gallery'
import ModalImage from "react-modal-image";
import ImgsViewer from 'react-images-viewer'
import { Zoom } from 'react-slideshow-image';
import ProductPictures from './ProductPictures'

class Clients extends Component {
    render() {

        const images = [
            {
              original: FND,
              thumbnail: FND,
            },
           
            {
              original: hbl,
              thumbnail: hbl,
            },
           
            {
              original: PIZZAHUTC,
              thumbnail: PIZZAHUTC,
            },
           
            {
              original: TAQ,
              thumbnail: TAQ,
            },
            {
              original: TECHNICAL,
              thumbnail: TECHNICAL,
            },
          ];

          const imagess = [
          
            Costa,
            dd,
           // msfLogo2,
           akuh,
          ];

          const zoomOutProperties = {
            duration: 5000,
            transitionDuration: 500,
            infinite: true,
           indicators: false,
            scale: 0.4,
            arrows: false
            

          }
        return (

            <React.Fragment>
            <Headers/>
           <br/>


           <Grid celled='internally'
           //centered={true}
           stackable
           >
    <Grid.Row >
  
    <Grid.Column width={3}
    //mobile={8}
      >
      <ProductPictures/>

      </Grid.Column>
      <Grid.Column width={9} >
              <Container text textAlign='left'>
      <h1 >Our Clients</h1>
           
    <Header as='h2'>Resturants</Header>
    <p>
    <li>Pizza Hut : Karachi, Lahore, Hyderabad, Islamabad, Peshawer, Railway Station Karachi and Railway Station Lahore</li>
    <li>
    KFC
    </li>

    <li>
    Nando’s
    </li>

    <li>

    Okra Grill Zamzama
    </li>
    <li>

    Mc Donald’s
    </li>
    <li>

    Costa Coffee shop
    </li>
    <li>

    Espresso Coffee Shop
    </li>
    <li>

    Dunkin Donuts
    </li>
    </p>
    
    <Header as='h2'>Hotels</Header>
    <p>
   <li>
    Pearl Continental Hotel
       
   </li>
   <li>
Serena Hotel and lodges : Islamabad, Faisalabad, Quetta, Sawat and Hunza
       
   </li>
   <li>
Khaplu Fort : Conservation project at district Ghanche Skardu
       
   </li>
   <li>
Marriot Hotel : Islamabad, Karachi
       
   </li>
   <li>
Shereton Hotel
       
   </li>
   <li>
Awari Towers
       
   </li>
   <li>
Crown Plaza
       
   </li>
   <li>
Midway House
       
   </li>
   <li>

Mehran Hotel
   </li>
    </p>
    
    <Header as='h2'>Hospitals</Header>
    <p>
        <li>
    Medicare Hospital

        </li>
        <li>
Aga Khan Hospital

        </li>
        <li>
Lady dufferin Hospital

        </li>
        <li>
Rehman Medical Institute (PVT) Ltd.

        </li>
        <li>
Kidney Center Hospital

        </li>
        <li>
Institute of Urology and Transplantation (S.I.U.T)

        </li>
        <li>
Tabba Heart Institute

        </li>
    </p>
 
    <Header as='h2'>Laboratories</Header>
    <p>
        <li>
    Pfizer Laboritaties

        </li>
        <li>
Novaties

        </li>
        <li>
Park Davis

        </li>
        <li>
Searle

        </li>
        <li>
Bayer

        </li>
        <li>
GlaxoSmithKline

        </li>
    </p>

    <Header as='h2'>Petroleum</Header>
    <p>
        <li>
    BHP billiton Petroleum Pak (PVT) Ltd.

        </li>
        <li>
Union Texas Petrolem

        </li>
        <li>
OMV : Pakistan

        </li>
    </p>

    <Header as='h2'>Clubs</Header>
    <p>
        <li>
    Creek Club

        </li>
        <li>
Karachi Club

        </li>
        <li>
Karachi Gymkhana

        </li>
        <li>
Muslim Gymkhana

        </li>
        <li>
Sindh Club

        </li>
        <li>
Arabian Sea Country Club

        </li>
    </p>

    <Header as='h2'>Others</Header>
    <p>
        <li>
    Habib Bank Plaza : Karachi

        </li>
        <li>
University Grant Commision : Islamabad

        </li>
        <li>
University of Karachi

        </li>
        <li>
Hino Pak Motors Ltd.

        </li>
        <li>
Unilever Pakistan

        </li>
        <li>
Pakistan International Airlines

        </li>
        <li>
Allied Bank Centeral Office

        </li>
        <li>
American School and American Consulate

        </li>
        <li>
Dewan Store (PVT) Ltd.

        </li>
        <li>
National Foods Ltd.

        </li>
        <li>
Unique Food Services Co.(PVT) Ltd.

        </li>
        <li>

Sheikh Zyed Palaces : Karachi, Rahim yar khan, Mir pur Sakro, Shamsi and Sakkur, Lahore, Kathoor.
        </li>
    </p>
    <Header as='h2'>Client Certificates</Header>
    <br/>
    <ImageGallery
                items={images}
                showIndex={true}
                //lazyLoad={true}
               // onImageLoad={true}
               // useBrowserFullscreen={false}
         showFullscreenButton={false} 
        
        showPlayButton={false}
        showThumbnails={false}
       //showNav={false}
            useBrowserFullscreen={false}
     
    
         />

</Container>
      </Grid.Column>
   
    </Grid.Row>

          
</Grid>

            <Footer/>

            </React.Fragment>
        );
    }
}

export default Clients;