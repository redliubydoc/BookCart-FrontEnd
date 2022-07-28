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
import MyBooks from './components/Author/Mybooks';
import Sales from './components/Admin/Sales';
import AdminManagement from './components/Admin/AdminManagement';
import MyBooksR from './components/Reader/MyBooksR';
import EPubViewer from './components/BookViwer/EPubViewer';
import ChangePassword from './components/Admin/ChangePassword';
import SellBooks from './components/Author/SellBooks';
import DummyPaymentGateway from './components/PaymentGateway/DummyPaymentGateway';
import MyOrders from './components/Reader/MyOrders ';
import AuthorSettings from './components/Author/AuthorSettings';
import ReviewBooks from './components/Admin/ReviewBooks';
import ReviewPage from './components/Admin/ReviewPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* unprotected routes */}
        <Route path="/" element={<Login/>}/>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/shop" element={<Home />}/>
        <Route path="/about-us" element={<AboutUs />}/>
        <Route path="/contact-us" element={<ContactUs />}/>
        <Route path="/book/:id" element={<ProductPage />}/>
        

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
        <Route path="/:uid/payment/" element={<DummyPaymentGateway/>}/>   

        {/* author specific routes */}
        <Route path="/author/:uid/book/" element={<MyBooks />} />
        <Route path="/author/:uid/sell/" element={<SellBooks/>} />
        <Route path="/author/:uid/settings/" element={<AuthorSettings/>} />

        {/* admin specific routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard/sales" element={<Sales/>}/>
        <Route path="/admin/dashboard/admin" element={<AdminManagement/>}/>
        <Route path="/admin/dashboard/change-password" element={<ChangePassword/>}/>
        <Route path="/admin/dashboard/review" element={<ReviewBooks/>}/>
        <Route path="/admin/dashboard/review/book/:id" element={<ReviewPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
