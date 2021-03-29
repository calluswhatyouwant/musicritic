/* @flow */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink, useHistory } from 'react-router-dom';

import { useSession } from '../app/App';
import { signOut } from '../../firebase/auth';
import SearchInput from '../search/SearchInput';

type Props = {
    changeLocale: (locale: string) => void,
};

const Navbar = ({ changeLocale }: Props) => {
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
            <div className="navbar-container">
                <NavbarLink href="/" text="Musicritic" brand />
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbar">
                    <div className="search">
                        <SearchInput handleSearch={handleSearch} />
                    </div>
                    <div className="nav-menus">
                        <LocaleSwitcher changeLocale={changeLocale} />
                        {userLoggedIn && (
                            <UserDropdownMenu
                                user={user}
                                handleLogout={handleLogout}
                            />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

const LocaleSwitcher = ({ changeLocale }: Props) => (
    <div className="btn-group">
        <button
            type="button"
            className="dropdown-toggle select-locale"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            <i className="fas fa-globe" />
        </button>
        <div className="dropdown-menu dropdown-menu-right">
            <button
                onClick={() => changeLocale('pt-br')}
                className="dropdown-item"
                type="button">
                PT-BR
            </button>
            <button
                onClick={() => changeLocale('en')}
                className="dropdown-item"
                type="button">
                EN
            </button>
        </div>
    </div>
);

type UserDropdownMenuProps = { user: any, handleLogout: () => void };

const UserDropdownMenu = ({ user, handleLogout }: UserDropdownMenuProps) => (
    <div className="btn-group">
        <button
            type="button"
            className="dropdown-toggle select-locale"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            {user.photoURL ? (
                <img
                    className="user-image"
                    src={user.photoURL}
                    alt={user.displayName ?? ''}
                />
            ) : (
                <i className="fas fa-user-circle" />
            )}
        </button>
        <div className="dropdown-menu dropdown-menu-right">
            {user.displayName && (
                <>
                    <p className="hello-user">
                        <FormattedMessage
                            id="hello-user"
                            values={{ user: <b>{user.displayName}</b> }}
                        />
                    </p>
                    <hr />
                </>
            )}
            <button
                className="dropdown-item"
                type="button"
                onClick={handleLogout}>
                <FormattedMessage id="logout" />
            </button>
        </div>
    </div>
);

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

export default Navbar;
