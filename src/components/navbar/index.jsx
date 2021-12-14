import "./styles.css"
import { 
    NavLink 
} from "react-router-dom";

import { Logout } from "../logout";

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
                    <Logout/>
                </li>
            </ul>
        </nav>
    )
}