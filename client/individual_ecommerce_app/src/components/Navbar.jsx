import { Link } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import { matchPath, useLocation } from "react-router-dom";
import { useContext } from "react";
import StateContext from "./StateContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
  const { auth, setAuth } = useContext(StateContext);
    function useRouteMatch(patterns) {
      const { pathname } = useLocation();
    
      for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
          return possibleMatch;
        }
      }
    
      return null;
    }
    
    async function logout() {
        window.localStorage.removeItem('token');
        setAuth(null);
    }

    
  const routeMatch = useRouteMatch(['/', '/products', '/cart', '/login']);
  const currentTab = routeMatch?.pattern?.path;
    return (
        <Tabs value={currentTab} sx= {{
          flexShrink: 0
        }}>
            <Tab label="Home" icon={<HomeIcon />} iconPosition="end" value="/" to="/" component={Link} />
            <Tab label="Products" icon={<InventoryIcon />} iconPosition="end" value="/products" to="/products" component={Link} />
            <Tab label="Cart" icon={<ShoppingCartIcon />} iconPosition="end" value="/cart" to="/cart" component={Link} />
            {auth ?
            <Tab label="Logout" icon={<LogoutIcon />} iconPosition="end" value="/login" onClick={logout}/> :
            <Tab label="Login/Register" icon={<LoginIcon />} iconPosition="end" value="/login" to="/login" component={Link} /> }
        </Tabs>
    )
}