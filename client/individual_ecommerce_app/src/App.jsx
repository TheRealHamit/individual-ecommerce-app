import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import './App.css';

function App() {

  return (
    <>
      <div id="main-section">
      <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/register" element={<h1>Register</h1>} />
          <Route path="/products" element={<h1>Products</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App
