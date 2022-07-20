import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from './components/Login';
import AdminLogin from './components/Admin/Login';
import ResetPassword from './components/ResetPassword';
import FeedbackFrom from './components/Reader/FeedbackFrom';
import Home from './components/Home';
import BuySubscription from './components/Reader/BuySubscription';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* normal users routes */}
      <Route path="/" element={<Login/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/shop" element={<Home/>}/>

      {/* reader routes */}
      <Route path="/feedback/add" element={<FeedbackFrom/>}/>
      <Route path="/product" element={<h1>Product Page</h1>}/>
      <Route path="/buy-subscription" element={<BuySubscription/>}/>


      {/* admin routes */}
      <Route path="/admin" element={<AdminLogin/>}/>
      <Route path="/admin/dashboard" element={<h1> Admin Dashboard</h1>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
