import React from 'react';

const Navbar = ({title = "Contact Keeper", icon = 'fas fa-id-card-alt'}) => {
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}/>{title}
            </h1>
        </div>
    );
};


export default Navbar;
