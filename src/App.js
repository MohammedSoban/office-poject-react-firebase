import React from 'react';
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import Header from './Components/Header/Header';
import {BrowserRouter} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Home from './Components/Home/Home'
import ProductsList from './Components/Products/ProductsList'
import SignupForm from './Components/SignupForm/SignupForm'
import PostProductForm from './Components/PostProduct/PostProductForm'
import ImageUpload from './Components/PostProduct/ImageUpload'
import ProductView from './Components/Products/ProductView'
import EditProduct from './Components/Products/EditProduct'
import Services from './Components/Services/Services'
import Clients from './Components/Clients/Clients'
import Contact from './Components/Contact/Contact';
import myUsers from './Components/AdminActions/myUsers';
import Queries from './Components/AdminActions/Queries';
import EditProfile from './Components/EditProfile/EditProfile';
import NoticeBoard from './Components/AdminActions/NoticeBoard';


function App() {
  return (
    <BrowserRouter>
    <div className="App">

    <Route exact path='/' component={Home}/>

      <Route exact path='/login' component={LoginForm}/>
      <Route exact path='/products' component={ProductsList}/>
      <Route exact path='/signup' component={SignupForm}/>
      <Route exact path='/postProduct' component={PostProductForm}/>
      <Route exact path='/imageUpload' component={ImageUpload}/>
      <Route exact path='/productView/:product_id' component={ProductView}/>
      <Route exact path='/editProduct/:product_id' component={EditProduct}/>
      <Route exact path='/services' component={Services}/>
      <Route exact path='/clients' component={Clients}/>
      <Route exact path='/contactUs' component={Contact}/>
      <Route exact path='/myusers/:notificationCount' component={myUsers}/>
      <Route exact path='/queries/:notificationCount' component={Queries}/>
      <Route exact path='/editprofile/:user_id' component={EditProfile}/>
      <Route exact path='/noticeBoard' component={NoticeBoard}/>
     
      

    </div>
    </BrowserRouter>
  );
}

export default App;
