import React, { Component } from 'react';
import { Container,Header,Image } from 'semantic-ui-react'
import Headers from '../Header/Header'
import Footer from '../Footer/Footer'
import Planning from './planning.jpg'
import Customization from './customization.jpg'

class Services extends Component {
    render() {
        return (

            <React.Fragment>
            <Headers/>
           <br/>

           <h1>Services We Offer</h1>
            <Container text
            textAlign='justified'
                
            
            >
    <Header as='h2'>Planing</Header>
    <p>
    The MSF fulfills requirements by planning according to different environment such as hospitals,
     commercial kitchens, medical laboratories and restaurants with respect to their process or functionality.
    </p>
    <Image src={Planning} width='700' height='300'/>
    <Header as='h2'>Designing and Drawing</Header>
    <p>
    The MSF provides designing support for production of new equipment and develop new products. With ample expertise in Auto-Cad, the MSF specializes in drawing 
    visual representation of the project to provide the client with clear picture of the final product.
    </p>
    
    <Header as='h2'>Customization</Header>
    <p>
    The MSF has the ability to custom built products according to our client’s need as per their requirement and deliver a satisfactory result.
    </p>
    <Image src={Customization} width='800' height='300'/>
    <Header as='h2'>Fabrication</Header>
    <p>
    The most important task at the MSF, the fabrication, is carried out using state-of-art technology and machinery imported from Germany, 
    Italy and America, which complete the most complex task with absolute precision and accuracy.
    </p>
  </Container>


            <Footer/>

            </React.Fragment>
        );
    }
}

export default Services;