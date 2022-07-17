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

      {/* admin routes */}
      <Route path="/admin" element={<AdminLogin/>}/>
      <Route path="/admin/dashboard" element={<h1> Admin Dashboard</h1>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
