import React from 'react';
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import Header from './Components/Header/Header';
import { BrowserRouter, Switch } from 'react-router-dom';
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
import addClients from './Components/AdminActions/addClients';
import PrivateRoute from "./Components/PrivateRoute"
import viewClients from './Components/AdminActions/viewClients';
import editClients from './Components/AdminActions/editClients';




function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={LoginForm} />
        <Route exact path='/products' component={ProductsList} />
        <Route exact path='/signup' component={SignupForm} />
        <Route exact path='/imageUpload' component={ImageUpload} />
        <Route exact path='/productView/:product_id' component={ProductView} />
        <Route exact path='/services' component={Services} />
        <Route exact path='/clients' component={Clients} />
        <Route exact path='/contactUs' component={Contact} />
        {/* <Route exact path='/editClients/:clients_id' component={editClients} /> */}
        {/* <Route exact path='/addClients' component={addClients} /> */}

        <Switch>
        <PrivateRoute exact path='/viewClients' component={viewClients} />
        <PrivateRoute exact path='/postProduct' component={PostProductForm} />
        <PrivateRoute exact path='/addClients' component={addClients} />
        <PrivateRoute exact path='/editProduct/:product_id' component={EditProduct} />
        <PrivateRoute exact path='/myusers/:notificationCount' component={myUsers} />
        <PrivateRoute exact path='/queries/:notificationCount' component={Queries} />
        <PrivateRoute exact path='/editprofile/:user_id' component={EditProfile} />
        <PrivateRoute exact path='/noticeBoard' component={NoticeBoard} />
          {/* <PrivateRoute exact path="/products" component={ProductsList}/> */}
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
