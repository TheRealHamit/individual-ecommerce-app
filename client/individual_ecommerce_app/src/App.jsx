import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import './App.css';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Products from './components/Products.jsx';
import { attemptLoginWithToken } from './API.js';
import Logout from './components/Logout.jsx';

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
      <Navbar auth={auth} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
        </Routes>
        {auth.id ? <Logout setAuth={setAuth} /> : null}
      </div>
    </>
  )
}

export default App
