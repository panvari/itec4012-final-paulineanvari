import "./styles.css"
import { 
    NavLink 
} from "react-router-dom";
import { Logout } from "../logout";
import { RiCake3Line } from 'react-icons/ri';

export const Navbar = () => {
    //return nav bar with icon, site title, links, and logout button
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li>
                    {/*define site icon*/}
                    <RiCake3Line className="site-icon" style={{fontSize: "35px"}} />
                </li>
                <li>
                    {/*define site title*/}
                    <h1 className="title">Sweet Talk</h1>
                </li>
                <li>
                    {/*define home page linnk*/}
                    <NavLink exact={true} activeClassName="nav-selected" to="/">Home</NavLink>
                </li>
                <li>
                    {/*define profile page link*/}
                    <NavLink activeClassName="nav-selected" to="/me">Profile</NavLink>
                </li>
                <li>
                    {/*define logout button*/}
                    <Logout className="logout"/>
                </li>
            </ul>
        </nav>
    )
}