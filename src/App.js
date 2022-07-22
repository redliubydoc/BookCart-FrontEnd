import './App.css';
import React, { Component, useState }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from './components/Login';
import AdminLogin from './components/Admin/Login';
import ResetPassword from './components/ResetPassword';
import FeedbackFrom from './components/Reader/FeedbackFrom';
import AccountSettings from './components/Settings/AccountSettings';
import { SellBooks } from './components/Admin/SellBooks';
import Orders from '../../BookCart-FrontEnd/src/Orders';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      
      {/* normal users routes */}
      <Route path="/" element={<Login/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/shop" element={<h1> Shop Page</h1>}/>

      {/* reader routes */}
      <Route path="feedback/add" element={<FeedbackFrom/>}/>

      {/*Author Account Settings*/}
      <Route path="/settings" element={<AccountSettings/>}/>

      {/*Sell Books Page*/}
      <Route path="/books" element={<SellBooks/>}/>

      {/*My Orders*/}
      <Route path="/my-orders" element={<Orders/>}/>

      

      {/* admin routes */}
      <Route path="/admin" element={<AdminLogin/>}/>
      <Route path="/admin/dashboard" element={<h1> Admin Dashboard</h1>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
