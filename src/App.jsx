import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from './components/Login';
import AdminLogin from './components/Admin/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* normal users routes */}
      <Route path="/" element={<Login/>}/>
      <Route path="/reset-password" element={<h1> Reset Password Page</h1>}/>
      <Route path="/shop" element={<h1> Shop Page</h1>}/>

      {/* admin routes */}
      <Route path="/admin" element={<AdminLogin/>}/>
      <Route path="/admin/dashboard" element={<h1> Admin Dashboard</h1>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
