import React from 'react';
import {Link} from "react-router-dom";

const Navbar = ({title = "Contact Keeper", icon = 'fas fa-id-card-alt'}) => {
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}/>{title}
            </h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </div>
    );
};


export default Navbar;
