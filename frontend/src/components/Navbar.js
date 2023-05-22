import React from "react";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    const activeClass = 'active';
    const normalClass = 'nav-link';

    return (
        <nav className='nav justify-content-center'>
            <NavLink to='/nfts' className={isActive => isActive ? `${normalClass} ${activeClass}` : normalClass}>
                Nfts
            </NavLink>
            <NavLink to='/creators' className={isActive => isActive ? `${normalClass} ${activeClass}` : normalClass}>
                Creators
            </NavLink>
            <NavLink to='/buyers' className={isActive => isActive ? `${normalClass} ${activeClass}` : normalClass}>
                Buyers
            </NavLink>
        </nav>
    );
}

export default Navbar;