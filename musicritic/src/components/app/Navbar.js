/* @flow */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink, useHistory } from 'react-router-dom';

import { useSession } from '../app/App';
import { signOut } from '../../firebase/auth';
import SearchInput from '../search/SearchInput';

const Navbar = ({
    locale,
    changeLocale,
}: {
    locale: string,
    changeLocale: (locale: string) => void,
}) => {
    const history = useHistory();
    const user = useSession();
    const userLoggedIn = user && user !== 'unknown';

    const handleSearch = (query: string, type: string) => {
        history.push(`/search/${type}/${query}`);
    };

    const handleLogout = () => {
        signOut().then(() => {
            localStorage.removeItem('spotifyToken');
            localStorage.removeItem('spotifyRefresh');
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
                    className="ml-auto navbar-collapse justify-content-stretch"
                    id="navbar">
                    <select
                        className="ml-auto select-locale"
                        defaultValue={locale}
                        onChange={e => changeLocale(e.target.value)}
                        id="locale">
                        <option value="" disabled hidden>
                            {locale.toUpperCase()}
                        </option>
                        <option value="pt-br">PT-BR</option>
                        <option value="en">EN</option>
                    </select>
                    {userLoggedIn && (
                        <div className="dropdown">
                            <div className="user-image-container">
                                {user.photoURL ? (
                                    <div className="user-image">
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName ?? ''}
                                        />
                                    </div>
                                ) : (
                                    <i className="fas fa-user-circle" />
                                )}
                                <i className="fas fa-angle-down" />
                            </div>
                            <div className="dropdown-content">
                                <LogoutButton handleLogout={handleLogout} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

type NavbarLinkProps = {
    href: string,
    text: string,
    brand?: boolean,
};

const NavbarLink = ({ text, href, brand }: NavbarLinkProps) => (
    <NavLink className={brand ? 'navbar-brand brand' : 'nav-link'} to={href}>
        {text}
    </NavLink>
);

NavbarLink.defaultProps = {
    brand: false,
};

type LogoutButtonProps = {
    handleLogout: () => void,
};

const LogoutButton = ({ handleLogout }: LogoutButtonProps) => (
    <button type="button" className="logout-button" onClick={handleLogout}>
        <FormattedMessage id="logout" />
    </button>
);

export default Navbar;
