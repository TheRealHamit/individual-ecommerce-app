import { Link } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import { matchPath, useLocation } from "react-router-dom";

export default function Navbar({ auth, setAuth }) {
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
        <Tabs value={currentTab}>
            <Tab label="Home" value="/" to="/" component={Link} />
            <Tab label="Products" value="/products" to="/products" component={Link} />
            <Tab label="Cart" value="/cart" to="/cart" component={Link} />
            {auth ?
            <Tab label="Logout" value="/login" onClick={logout}/> :
            <Tab label="Login/Register" value="/login" to="/login" component={Link} /> }
        </Tabs>
    )
}