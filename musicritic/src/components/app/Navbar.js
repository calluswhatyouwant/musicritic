/* @flow */

import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { useSession } from '../app/App';
import { signOut } from '../../firebase/auth';
import SearchInput from '../search/SearchInput';

const Navbar = () => {
    const history = useHistory();
    const user = useSession();

    const handleSearch = query => {
        history.push(`/search/tracks/${query}`);
    };

    const handleLogout = () => {
        signOut().then(() => {
            localStorage.removeItem('spotifyRefresh');
            localStorage.removeItem('refresh');
            localStorage.removeItem('authToken');
            history.push('/home');
        });
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
                    { user && <LogoutButton handleLogout={handleLogout}/> }
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

type LogoutButtonProps = {
    handleLogout: () => void
};

const LogoutButton = ({ handleLogout }: LogoutButtonProps) =>
        <button type='button' className='logout-button' onClick={handleLogout}>
            Logout
        </button>

export default Navbar;
