import "./styles.css"
import { 
    NavLink 
} from "react-router-dom";

import { Logout } from "../logout";
import { RiCake3Line } from 'react-icons/ri';

export const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li>
                    <RiCake3Line className="site-icon" style={{fontSize: "35px"}} />
                </li>
                <li>
                    <h1 className="title">Sweet Talk</h1>
                </li>
                <li>
                    <NavLink exact={true} activeClassName="nav-selected" to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="nav-selected" to="/me">Profile</NavLink>
                </li>
                <li>
                    <Logout className="logout"/>
                </li>
            </ul>
        </nav>
    )
}