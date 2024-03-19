import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Navbar({ auth, setAuth }) {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            {auth.id ? <Logout setAuth={setAuth} /> : <Link to="/login">Login/Register</Link>}
        </nav>
    )
}