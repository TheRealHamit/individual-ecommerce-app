import { useEffect, useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from './components/Home.jsx';
import LoginRegister from './components/LoginRegister.jsx';
import Products from './components/Products.jsx';
import { attemptLoginWithToken, getCart } from './API.js';
import Cart from './components/Cart.jsx';
import { Container } from '@mui/material';
import StateContext from './components/StateContext.jsx';

function App() {
  const { auth, setAuth, setCart } = useContext(StateContext);

  useEffect(() => {
    async function fetchCart() {
        setCart(await getCart());
    }
    if (auth) {
        fetchCart();
    }
  }, [auth, setCart])

  useEffect(()=> {
    const token = window.localStorage.getItem('token');
    async function getAuthWithToken() {
      setAuth(await attemptLoginWithToken());
    }
    
    if (token) {
      getAuthWithToken();
    }
  }, []);

  return (
    <>
      <Container sx={{
        width: '100%',
        }}>
        <Navbar auth={auth} setAuth={setAuth} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        {/* {auth.id ? <Logout setAuth={setAuth} /> : null} */}
      </Container>
    </>
  )
}

export default App
