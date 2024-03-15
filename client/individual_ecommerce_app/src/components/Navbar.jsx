import { Link } from "react-router-dom";

export default function Navbar({ auth }) {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            {auth.id ? null : <Link to="/login">Login</Link>}
            {auth.id ? null : <Link to="/register">Register</Link>}
        </nav>
    )
}