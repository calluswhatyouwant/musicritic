/* @flow */

import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import SearchInput from '../search/SearchInput';

const Navbar = props => {
    const history = useHistory();

    const handleSearch = query => {
        history.push(`/search/tracks/${query}`);
    };

    return (
        <nav className="navbar navbar-expand-md navbar-dark sticky-top">
            <div className="container">
                <NavbarLink href="/" text="Musicritic" brand />
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="form-inline search">
                    <SearchInput handleSearch={handleSearch} />
                </div>
                <div
                    className="navbar-collapse justify-content-stretch"
                    id="navbar">
                    <ul className="navbar-nav ml-auto">
                        <NavbarItem text="Home" href="/home" />
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const NavbarItem = ({ href, text }) => (
    <li className="nav-item">
        <NavbarLink href={href} text={text} />
    </li>
);

const NavbarLink = ({ text, href, brand }) => (
    <NavLink className={brand ? 'navbar-brand brand' : 'nav-link'} to={href}>
        {text}
    </NavLink>
);

export default Navbar;
