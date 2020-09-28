/* @flow */

import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import SearchInput from '../search/SearchInput';

const Navbar = () => {
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

type NavbarItemProps = {
    href: string,
    text: string,
}

const NavbarItem = ({ href, text }: NavbarItemProps) => (
    <li className="nav-item">
        <NavbarLink href={href} text={text} />
    </li>
);

type NavbarLinkProps = {
    href: string,
    text: string,
    brand?: boolean,
}

const NavbarLink = ({ text, href, brand }: NavbarLinkProps) => (
    <NavLink className={brand ? 'navbar-brand brand' : 'nav-link'} to={href}>
        {text}
    </NavLink>
);

NavbarLink.defaultProps = {
    brand: false,
}

export default Navbar;
