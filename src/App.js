import React from 'react';
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import Header from './Components/Header/Header';
import {BrowserRouter} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Home from './Components/Home/Home'
import ProductsList from './Components/Products/ProductsList'
import SignupForm from './Components/SignupForm/SignupForm'


function App() {
  return (
    <BrowserRouter>
    <div className="App">

    <Route exact path='/' component={Home}/>

      <Route exact path='/login' component={LoginForm}/>
      <Route exact path='/products' component={ProductsList}/>
      <Route exact path='/signup' component={SignupForm}/>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
