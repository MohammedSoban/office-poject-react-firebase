import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {style } from '@material-ui/core/styles';
import { width } from "@material-ui/system";
import MsfLogo from './msfLogo.png'

const FooterPagePro = () => {
  return (

    
    <div style={{ 
     

  
  
  
     /* Height of the footer */
      }}>
    <MDBFooter color='unique-color-dark' className="font-small pt-4 mt-4">
   

<div style={{display:'justified'}}>
<a href='/'>
<img src={MsfLogo}  height='50'  />
</a>
</div>

      <MDBContainer className="text-center text-md-left">
        <MDBRow className="text-center text-md-left mt-3 pb-3">
          <MDBCol md="3" lg="3" xl="3" className="mx-auto mt-3">


      
        
            <h6 className="text-uppercase mb-4 font-weight-bold">

             MOON STEEL FABRICATORS

            </h6>
            <p>
               YOU THINK HARD, WE MAKE IT SOLID
            </p>
          </MDBCol>
          <hr className="w-100 clearfix d-md-none" />
         
          <hr className="w-100 clearfix d-md-none" />
          <MDBCol md="3" lg="2" xl="2" className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              Useful links
            </h6>
            <p>
              <a href="/products">Products</a>
            </p>
            <p>
              <a href="/services">Services</a>
            </p>
            <p>
              <a href="/clients">Clients</a>
            </p>
            <p>
              <a href="/contactus">Contact Us</a>
            </p>
          </MDBCol>
          <hr className="w-100 clearfix d-md-none" />
          <MDBCol md="4" lg="3" xl="3" className="mx-auto mt-3">

            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
           
            <p>
            <a href="http://maps.google.com/?q=Plot N.O 142, sector 24, Korangi Industrial Area" target='_blank'>
              <i className="fa fa-home mr-3" />Plot N.O 142, sector 24, Korangi Industrial Area, Karachi, Pakistan
              </a>
            </p>
        
            <p>
            <a href='mailto:moonsteelf@gmail.com'>
              <i className="fa fa-envelope mr-3" />moonsteelf@gmail.com
              </a>
            </p>
            <p>
            <a href='tel:+92-21-35121145'>
              <i className="fa fa-phone mr-3" /> +92-21-35121145
              </a>
            </p>
            <p>
            <a href='tel:+92-21-35121146'>
                            <i className="fa fa-phone mr-3" /> +92-21-35121146
                            </a>

            </p>
          </MDBCol>
        </MDBRow>
        <hr />
        <MDBRow className="d-flex align-items-center">
          <MDBCol md="8" lg="8">
            <p className="text-center text-md-left grey-text">
              &copy; {new Date().getFullYear()} Copyright:{" "}
              <a href="https://www.MDBootstrap.com"> MOON STEEL FABRICATORS </a>
            </p>
          </MDBCol>
          <MDBCol md="4" lg="4" className="ml-lg-0">
            <div className="text-center text-md-right">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm rgba-white-slight mx-1">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm rgba-white-slight mx-1">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm rgba-white-slight mx-1">
                    <i className="fab fa-google-plus" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="btn-floating btn-sm rgba-white-slight mx-1">
                    <i className="fab fa-linkedin-in" />
                  </a>
                </li>
              </ul>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
    </div>
    
  );
}

export default FooterPagePro;