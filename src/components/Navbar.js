import React from 'react';
import { NavLink } from 'react-router-dom'

import './Navbar.css';
const Navbar = () => {
    const admin = localStorage.getItem('adminData');
    return (
        <nav>
            <div className="nav-wrapper">
                <a href="" className="brand-logo right">RandomPoet</a>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><NavLink activeClassName='navBarActive' exact to='/'>Home</NavLink></li>
                    <li><NavLink activeClassName='navBarActive' to='/about'>About us</NavLink></li>
                    <li>{admin ? <NavLink activeClassName='navBarActive' to="/admin/"> AdminPanel </NavLink> : <NavLink activeClassName='navBarActive' to="/admin/login"> Login </NavLink>} </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;