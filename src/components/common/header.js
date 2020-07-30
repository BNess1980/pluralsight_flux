import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return(
            <nav className="custom__nav">
                <NavLink to="/" exact activeClassName="nav__link--active">Home</NavLink>
                <NavLink to="/about" activeClassName="nav__link--active">About</NavLink>
                <NavLink to="/courses" activeClassName="nav__link--active">Courses</NavLink>
            </nav>
        )
    }
}

export default Header;