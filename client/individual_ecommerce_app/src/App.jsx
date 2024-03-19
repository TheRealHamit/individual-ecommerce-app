import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import './App.css';
import Home from './components/Home.jsx';
import LoginRegister from './components/LoginRegister.jsx';
import Products from './components/Products.jsx';
import { attemptLoginWithToken } from './API.js';
import Logout from './components/Logout.jsx';
import Cart from './components/Cart.jsx';

function App() {
  const [auth, setAuth] = useState({});

  useEffect(()=> {
    const token = window.localStorage.getItem('token');
    if(token){
      attemptLoginWithToken(setAuth);
    }
  }, []);

  return (
    <>
      <div id="main-section">
      <Navbar auth={auth} setAuth={setAuth} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<LoginRegister auth={auth} setAuth={setAuth} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        {/* {auth.id ? <Logout setAuth={setAuth} /> : null} */}
      </div>
    </>
  )
}

export default App
