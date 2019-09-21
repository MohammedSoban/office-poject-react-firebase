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
    
      

    </div>
    </BrowserRouter>
  );
}

export default App;
