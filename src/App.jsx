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
import MySubscription from './components/Reader/MySubscription';
import ProductPage from './components/ProductPage';
import BookPage from './components/BookPage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Cart from './components/Reader/Cart';
import Settings from './components/Settings';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* normal users routes */}
      <Route path="/" element={<Login/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/shop" element={<Home/>}/>
      <Route path="/about-us" element={<AboutUs/>}/>
      <Route path="/contact-us" element={<ContactUs/>}/>

      {/* reader routes */}
      <Route path="/feedback/add" element={<FeedbackFrom/>}/>
      <Route path="/buy-subscription" element={<BuySubscription/>}/>
      <Route path="/my-subscription" element={<MySubscription/>}/>
      <Route path="/product-page" element={<ProductPage/>}/>
      <Route path="/book-page" element={<BookPage/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/settings" element={<Settings/>}/>


      {/* admin routes */}
      <Route path="/admin" element={<AdminLogin/>}/>
      <Route path="/admin/dashboard" element={<h1> Admin Dashboard</h1>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
