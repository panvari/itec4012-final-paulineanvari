import "./styles.css"
import { 
    NavLink 
} from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li>
                    <NavLink exact={true} activeClassName="nav-selected" to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="nav-selected" to="/me">Profile</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="nav-selected" to="/login">Logout</NavLink>
                </li>
            </ul>
        </nav>
    )
}