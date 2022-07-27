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
import MyBooksR from './components/Reader/MyBooksR';
import EPubViewer from './components/BookViwer/EPubViewer';
import ChangePassword from './components/Admin/ChangePassword';
import SellBooks from './components/Author/SellBooks';
import DummyPaymentGateway from './components/PaymentGateway/DummyPaymentGateway';
import MyOrders from './components/Reader/MyOrders ';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* normal users routes */}
        <Route path="/" element={<Login/>} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/shop" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        

        {/* reader specific routes */}
        <Route path="/:uid/book/" element={<MyBooksR/>} />
        <Route path="/:uid/subscription/active/" element={<MySubscription/>}/>
        <Route path="/:uid/book/:id" element={<BookPage/>}/>
        <Route path="/:uid/book/:id/feedback/" element={<FeedbackFrom/>}/>
        <Route path="/:uid/book/:id/read/" element={<EPubViewer/>}/>
        <Route path="/:uid/settings/" element={<Settings/>}/>
        <Route path="/:uid/order" element={<MyOrders/>}/> 
        <Route path="/:uid/cart/" element={<Cart/>}/>
        <Route path="/:uid/subscription/buy/" element={<BuySubscription/>}/>
        <Route path="/:uid/payment" element={<DummyPaymentGateway/>}/>   


        <Route path="/book/:id" element={<ProductPage />} />
              

        {/* author routes */}
        <Route path="/author/book" element={<MyBooks />} />
        <Route path="/author/sell-book" element={<SellBooks/>} />

        {/* admin routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard/sales" element={<Sales/>}/>
        <Route path="/admin/dashboard/admin" element={<AdminManagement/>}/>
        <Route path="/admin/dashboard/change-password" element={<ChangePassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
