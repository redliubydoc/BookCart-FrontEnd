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
import MyBooks from './components/Author/MyBooks';
import Sales from './components/Admin/Sales';
import AdminManagement from './components/Admin/AdminManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* normal users routes */}
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/shop" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />

        {/* reader routes */}
        <Route path="/feedback/add" element={<FeedbackFrom />} />
        <Route path="/buy-subscription" element={<BuySubscription />} />
        <Route path="/my-subscription" element={<MySubscription />} />

        <Route path="/book/:id" element={<ProductPage />} />
        <Route path="/:uid/book/:id" element={<BookPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/payment-page" element={<h1> Payment Page </h1>} />

        {/* author routes */}
        <Route path="/author/book" element={<MyBooks />} />

        {/* admin routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard/sales" element={<Sales/>}/>
        <Route path="/admin/dashboard/admin" element={<AdminManagement/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
