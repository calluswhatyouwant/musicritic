/* @flow */

import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { useSession } from '../app/App';
import { signOut } from '../../firebase/auth';
import SearchInput from '../search/SearchInput';
import { FormattedMessage } from 'react-intl';

const Navbar = ({
    locale,
    changeLocale,
}: {
    locale: string,
    changeLocale: () => void,
}) => {
    const history = useHistory();
    const user = useSession();

    const handleSearch = query => {
        history.push(`/search/tracks/${query}`);
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
                    className="navbar-collapse justify-content-stretch"
                    id="navbar">
                    <ul className="navbar-nav ml-auto">
                        <NavbarItem text="Home" href="/home" />
                    </ul>
                    {user && user !== 'unknown' && (
                        <LogoutButton handleLogout={handleLogout} />
                    )}
                    <select
                        className="select-locale"
                        defaultValue={locale}
                        onChange={e => changeLocale(e.target.value)}
                        id="locale">
                        <option value="" disabled hidden>
                            {locale.toUpperCase()}
                        </option>
                        <option value="pt-br">PT-BR</option>
                        <option value="en">EN</option>
                    </select>
                </div>
            </div>
        </nav>
    );
};

type NavbarItemProps = {
    href: string,
    text: string,
};

const NavbarItem = ({ href, text }: NavbarItemProps) => (
    <li className="nav-item">
        <NavbarLink href={href} text={text} />
    </li>
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

type LogoutButtonProps = {
    handleLogout: () => void,
};

const LogoutButton = ({ handleLogout }: LogoutButtonProps) => (
    <button type="button" className="logout-button" onClick={handleLogout}>
        <FormattedMessage id="logout" />
    </button>
);

export default Navbar;
